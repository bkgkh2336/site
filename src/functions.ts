export const GetData = async (nameTable: string) => {
    try {
        const response = await fetch(`/backend/api.php/api/${nameTable}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}