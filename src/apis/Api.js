import axios from "axios";

import state from "../store/fac/state";

const Api = axios.create({
  //baseURL: 'https://pharma-delib-api.herokuapp.com/api'
  baseURL: state.api_url,
});

export default Api;
