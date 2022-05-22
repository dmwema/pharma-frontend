import axios from "axios";

const Api = axios.create({
  //baseURL: 'https://pharma-delib-api.herokuapp.com/api'
  baseURL: "http://localhost:8000/api",
});

export default Api;
