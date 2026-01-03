async function getCategory() {

    try {
        const userInfo = JSON.parse(localStorage.getItem("user_info"));

        const token = userInfo?.token;

        const resp = await fetch(
            "http://localhost:3000/api/menu/categories",
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!resp.ok) {
            throw new Error(`HTTP error! Status: ${resp.status}`);
        }

        const categories = await resp.json();
        return categories;

    } catch (error) {
        console.error("Failed to fetch categories:", error);
        return [];
    }
}

export default getCategory;
