import axios from 'axios';

const baseURL = "http://localhost:8080";

export const getToken = () => localStorage.getItem("token")
  ? String(localStorage.getItem("token"))
  : null;

export const getAuthorizationHeader = () => `Bearer ${getToken()}`;

export const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: getAuthorizationHeader() },
});