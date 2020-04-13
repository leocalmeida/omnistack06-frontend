import axios from "axios";

const api = axios.create({
    baseURL: "https://omnistack-06-backnd.herokuapp.com",
    // baseURL: "http://localhost:3333",
});



export default api;