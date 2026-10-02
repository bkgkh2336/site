const MAX_SIDE = 1920;
const QUALITY = 0.95;
const ICC_SCAN_LIMIT = 512 * 1024;

const SRGB_MATRIX = [
    0.436, 0.2225, 0.0139, 0.3851, 0.7169, 0.0971, 0.1431, 0.0606, 0.7141
];
const SRGB_TOLERANCE = 0.04;

const loadImage = (file: File): Promise<{ img: HTMLImageElement; url: string }> =>
    new Promise((resolve, reject) => {
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => resolve({ img, url });
        img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error('image load failed'));
        };
        img.src = url;
    });

const readHead = async (file: File): Promise<Uint8Array> => {
    const end = Math.min(file.size, ICC_SCAN_LIMIT);
    const buf = await file.slice(0, end).arrayBuffer();
    return new Uint8Array(buf);
};

const bytesEqual = (hay: Uint8Array, from: number, needle: number[]): boolean => {
    for (let i = 0; i < needle.length; i++) {
        if (hay[from + i] !== needle[i]) return false;
    }
    return true;
};

const ICC_MARKER = Array.from('ICC_PROFILE').map(c => c.charCodeAt(0));

const containsIccMarker = (head: Uint8Array): boolean => {
    for (let i = 0; i + ICC_MARKER.length <= head.length; i++) {
        if (bytesEqual(head, i, ICC_MARKER)) return true;
    }
    return false;
};

const s15Fixed16 = (view: DataView, offset: number): number =>
    view.getInt32(offset, false) / 65536;

const parseIccMatrix = (icc: Uint8Array): number[] | null => {
    if (icc.length < 132 + 12) return null;
    const view = new DataView(icc.buffer, icc.byteOffset, icc.byteLength);
    const tagCount = view.getUint32(128, false);
    const wanted = ['rXYZ', 'gXYZ', 'bXYZ'];
    const offsets: Record<string, number> = {};
    for (let t = 0; t < tagCount; t++) {
        const entry = 132 + t * 12;
        if (entry + 12 > icc.length) break;
        const sig = String.fromCharCode(
            icc[entry],
            icc[entry + 1],
            icc[entry + 2],
            icc[entry + 3]
        );
        if (wanted.includes(sig)) offsets[sig] = view.getUint32(entry + 4, false);
    }
    const matrix: number[] = [];
    for (const sig of wanted) {
        const off = offsets[sig];
        if (off === undefined || off + 20 > icc.length) return null;
        const type = String.fromCharCode(icc[off], icc[off + 1], icc[off + 2], icc[off + 3]);
        if (type !== 'XYZ ') return null;
        matrix.push(
            s15Fixed16(view, off + 8),
            s15Fixed16(view, off + 12),
            s15Fixed16(view, off + 16)
        );
    }
    return matrix;
};

const distanceToSrgb = (matrix: number[]): number => {
    let sum = 0;
    for (let i = 0; i < SRGB_MATRIX.length; i++) {
        sum += Math.abs(matrix[i] - SRGB_MATRIX[i]);
    }
    return sum;
};

const extractJpegIcc = (head: Uint8Array): Uint8Array | null => {
    if (head.length < 4 || head[0] !== 0xff || head[1] !== 0xd8) return null;
    const parts: { seq: number; data: Uint8Array }[] = [];
    let i = 2;
    while (i + 4 <= head.length) {
        if (head[i] !== 0xff) break;
        const marker = head[i + 1];
        if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
            i += 2;
            continue;
        }
        if (marker === 0xda || marker === 0xd9) break;
        if (i + 4 > head.length) break;
        const len = (head[i + 2] << 8) | head[i + 3];
        if (len < 2) break;
        if (i + 2 + len > head.length) break;
        if (marker === 0xe2 && len >= 16) {
            const seg = head.subarray(i + 4, i + 2 + len);
            if (bytesEqual(seg, 0, ICC_MARKER) && seg[11] === 0 && seg[12] > 0) {
                parts.push({ seq: seg[12], data: seg.subarray(14) });
            }
        }
        i += 2 + len;
    }
    if (!parts.length) return null;
    parts.sort((a, b) => a.seq - b.seq);
    const total = parts.reduce((n, p) => n + p.data.length, 0);
    const out = new Uint8Array(total);
    let o = 0;
    for (const p of parts) {
        out.set(p.data, o);
        o += p.data.length;
    }
    return out;
};

const extractPngIcc = (head: Uint8Array): Uint8Array | null => {
    if (head.length < 8) return null;
    const sig = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
    for (let i = 0; i < 8; i++) {
        if (head[i] !== sig[i]) return null;
    }
    let i = 8;
    while (i + 12 <= head.length) {
        const view = new DataView(head.buffer, head.byteOffset, head.byteLength);
        const len = view.getUint32(i, false);
        const type = String.fromCharCode(
            head[i + 4],
            head[i + 5],
            head[i + 6],
            head[i + 7]
        );
        if (type === 'iCCP') {
            const data = head.subarray(i + 8, i + 8 + len);
            if (!data.length) return null;
            let z = 0;
            while (z < data.length && data[z] !== 0) z++;
            return data.subarray(z + 2);
        }
        if (type === 'IEND' || i + 12 + len > head.length) break;
        i += 12 + len;
    }
    return null;
};

const inflateZlib = async (data: Uint8Array): Promise<Uint8Array> => {
    const stream = new Blob([data as BlobPart])
        .stream()
        .pipeThrough(new DecompressionStream('deflate'));
    return new Uint8Array(await new Response(stream).arrayBuffer());
};

const isWideGamut = async (head: Uint8Array): Promise<boolean> => {
    if (head.length >= 2 && head[0] === 0xff && head[1] === 0xd8) {
        const icc = extractJpegIcc(head);
        if (!icc) return true;
        const matrix = parseIccMatrix(icc);
        if (!matrix) return true;
        return distanceToSrgb(matrix) >= SRGB_TOLERANCE;
    }
    if (head.length >= 8 && head[0] === 0x89 && head[1] === 0x50) {
        try {
            const compressed = extractPngIcc(head);
            if (!compressed) return true;
            const icc = await inflateZlib(compressed);
            const matrix = parseIccMatrix(icc);
            if (!matrix) return true;
            return distanceToSrgb(matrix) >= SRGB_TOLERANCE;
        } catch {
            return true;
        }
    }
    return true;
};

const containsPngIccp = (head: Uint8Array): boolean => {
    if (head.length < 8) return false;
    const sig = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
    for (let i = 0; i < 8; i++) {
        if (head[i] !== sig[i]) return false;
    }
    const view = new DataView(head.buffer, head.byteOffset, head.byteLength);
    let i = 8;
    while (i + 12 <= head.length) {
        const len = view.getUint32(i, false);
        const type = String.fromCharCode(
            head[i + 4],
            head[i + 5],
            head[i + 6],
            head[i + 7]
        );
        if (type === 'iCCP') return true;
        if (type === 'IEND' || i + 12 + len > head.length) return false;
        i += 12 + len;
    }
    return false;
};

export const resizeImageForUpload = async (file: File): Promise<File> => {
    if (!file.type.startsWith('image/') || file.type === 'image/gif') return file;

    let objectUrl = '';
    try {
        const head = await readHead(file);
        const hasIcc = containsIccMarker(head) || containsPngIccp(head);

        const { img, url } = await loadImage(file);
        objectUrl = url;

        const needsResize =
            img.naturalWidth > MAX_SIDE || img.naturalHeight > MAX_SIDE;

        if (!needsResize && !hasIcc) return file;
        if (!needsResize && !(await isWideGamut(head))) return file;

        const scale = Math.min(1, MAX_SIDE / Math.max(img.naturalWidth, img.naturalHeight));
        const width = Math.max(1, Math.round(img.naturalWidth * scale));
        const height = Math.max(1, Math.round(img.naturalHeight * scale));

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return file;
        ctx.drawImage(img, 0, 0, width, height);

        let type: string;
        if (needsResize) {
            type = file.type === 'image/png' ? 'image/webp' : 'image/jpeg';
        } else if (file.type === 'image/png') {
            type = 'image/png';
        } else if (file.type === 'image/webp') {
            type = 'image/webp';
        } else {
            type = 'image/jpeg';
        }

        const blob = await new Promise<Blob | null>(resolve =>
            canvas.toBlob(resolve, type, QUALITY)
        );
        if (!blob || blob.type !== type) return file;
        if (needsResize && blob.size >= file.size) return file;

        const base = file.name.replace(/\.[^.]+$/, '') || 'image';
        const ext = type === 'image/webp' ? 'webp' : type === 'image/png' ? 'png' : 'jpg';
        return new File([blob], `${base}.${ext}`, { type, lastModified: Date.now() });
    } catch {
        return file;
    } finally {
        if (objectUrl) URL.revokeObjectURL(objectUrl);
    }
};
