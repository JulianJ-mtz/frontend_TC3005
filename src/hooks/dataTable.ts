export async function fetchAllProducts(): Promise<Response> {
    try {
        const response = await fetch("https://66232d7b3e17a3ac846ebc91.mockapi.io/api/Products");
        if (!response.ok) {
            throw new Error(`Error fetching products: ${response.statusText}`);
        }
        return response;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}





