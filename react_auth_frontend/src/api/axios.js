import axios from "axios";
const BASE_URL = "http://localhost:3500";

// setting base url as default
export default axios.create({
  baseURL: BASE_URL,
});

// Axios provides a feature called "Interceptors" that allows you to intercept and manipulate HTTP requests and responses globally. The code will run in the background and will generate a new access token every time the previous access token is expired
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // always sends the cookies to server for every request
});
