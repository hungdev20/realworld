import axios from "axios";
const AUTH_TOKEN = localStorage.getItem("token");
export default axios.create({
    baseURL: "https://api.realworld.io/api",
    headers: {
        Authorization: "Token " + (AUTH_TOKEN ? AUTH_TOKEN.toString() : ""),
    }
})