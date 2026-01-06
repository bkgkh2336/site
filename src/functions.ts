export const GetData = async (nameTable: string) => {
    try {
        const response = await fetch(`http://localhost:3001/${nameTable}`);
        const data = await response.json();
        return data;
    } catch (error) {
        return console.error('Error fetching data:', error);
    }
}