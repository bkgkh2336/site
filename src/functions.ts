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