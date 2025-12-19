async function getCategory() {
    try {
        const resp = await fetch('http://localhost:3000/api/menu/categories');

        if (!resp.ok) {
            throw new Error(`HTTP error! Status: ${resp.status}`);
        }

        const categories = await resp.json();
        return categories;
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        return [];
    }
}

export default getCategory;