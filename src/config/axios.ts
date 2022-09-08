import axios from "axios";

axios.interceptors.request.use(
  (request) => {
    // Edit request config
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    // Edit response config
    return response;
  },
  (error: any) => {
    // Handle error
    return Promise.reject(error);
  }
);

const weatherAxios = axios.create({
  baseURL: process.env.REACT_APP_WEATHER_BASE_URL,
})

export default weatherAxios;
