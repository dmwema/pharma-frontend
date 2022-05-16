import axios from "axios"

const Api = axios.create({
    baseURL: 'https://pharma-delib-api.herokuapp.com'
})

export default Api