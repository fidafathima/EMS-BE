import axios from "axios";
import { store } from "../redux/store"; 
import { updateUser, clearUser } from "../redux/UserSlice";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// Add interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { token, refreshToken } = store.getState().user;

    if (error.response?.status === 401 && refreshToken && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
          refresh: refreshToken,
        });
        const newToken = res.data.access;

        store.dispatch(updateUser({ ...store.getState().user, token: newToken }));

        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        store.dispatch(clearUser());
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
