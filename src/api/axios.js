import axios from "axios"

const baseURL = "https://127.0.0.1:5000"
const Authorization =localStorage.getItem("access_token")

export default axios.create({
    baseURL
})

export const axiosBase = axios.create({
    baseURL,
    headers:{
        'Content-Type': 'aplication/json',
    },
    withCredentials: true,
    

})


