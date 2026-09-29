export const GetData = async (nameTable: string) => {
    try {
        const response = await fetch(`/backend/api.php/api/${nameTable}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch {
        // Возвращаем пустой массив при ошибке
        return [];
    }
}

// В БД отделов два формата src: легаси-имя ('reception.png' в public/departments/)
// и полный путь из админки ('/uploads/...'). Приводит к рабочему URL.
export const ResolveDepartmentImage = (src?: string): string => {
    if (!src) return '';
    if (src.startsWith('/') || /^https?:\/\//.test(src)) return src;
    return `/departments/${src}`;
}

// Порядок отображения руководства (только сортировка;
// состав раздела определяется флагом is_primary)
const leadershipOrder = ['Директор', 'Первый заместитель директора - Главный инженер', 'Заместитель директора'];

export const SortLeadership = <T extends { job_title?: string }>(list: T[]): T[] => {
    return [...list].sort((a, b) => {
        const ai = leadershipOrder.indexOf(a.job_title || '');
        const bi = leadershipOrder.indexOf(b.job_title || '');
        return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    });
}