import axios from "axios";

const valida = localStorage.getItem("valida");

const api = axios.create({
  // baseURL: "http://localhost:3333",
  baseURL: "https://omnistack-06-backnd.herokuapp.com",
  headers: {
    authorization: valida,
  },
});

export default api;
