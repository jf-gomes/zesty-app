import axios from "axios";

const api = axios.create({
    baseURL: 'https://zesty-backend-mu.vercel.app'
})

export default api