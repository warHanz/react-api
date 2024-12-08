import axios from "axios";

// Konfigurasi dasar Axios
const api = axios.create({
	baseURL: "http://localhost:8000", // Ganti dengan URL backend Laravel Anda
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

export default api;
