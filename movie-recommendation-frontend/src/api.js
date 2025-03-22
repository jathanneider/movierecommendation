import axios from "axios";

const API_URL = "http://localhost:8080";  // backend API URL

export const getRandomMovie = async () => {
    try {
        const response = await axios.get(`${API_URL}/movies/random`);
        return response.data;
    } catch (error) {
        console.error("Error fetching movie:", error);
        return null;
    }
};