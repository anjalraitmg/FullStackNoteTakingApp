import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
});

// 1. Attach access token to headers
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// 2. Intercept 401s and try refreshing token (skip for auth routes!)
API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Do NOT retry if the failed request was login, register, or refresh itself!
        const isAuthRoute =
            originalRequest.url.includes("/auth/login/") ||
            originalRequest.url.includes("/auth/register/") ||
            originalRequest.url.includes("/auth/refresh/");

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !isAuthRoute &&
            localStorage.getItem("refreshToken")
        ) {
            originalRequest._retry = true;
            try {
                const res = await axios.post("http://127.0.0.1:8000/api/auth/refresh/", {
                    refresh: localStorage.getItem("refreshToken"),
                });
                localStorage.setItem("accessToken", res.data.access);
                originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
                return API(originalRequest);
            } catch {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("username");
                window.location.reload();
            }
        }
        return Promise.reject(error);
    }
);

// Auth endpoints
export const login = (credentials) => API.post("/auth/login/", credentials);
export const register = (userData) => API.post("/auth/register/", userData);

// Notes endpoints
export const getNotes = () => API.get("/notes/");
export const createNote = (note) => API.post("/notes/", note);
export const updateNote = (id, note) => API.patch(`/notes/${id}/`, note);
export const deleteNote = (id) => API.delete(`/notes/${id}/`);

export default API;