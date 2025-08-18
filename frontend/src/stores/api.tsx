import axios from "axios"

const URL_API=axios.create({
    baseURL:"http://127.0.0.1:5000/api"
})
export default URL_API