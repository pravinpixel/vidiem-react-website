import axios from "axios"
import { CONSTANTS } from "./AppConstants";
import { getLocalStorage } from "./HelperFunctions";

const BASE_URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_PRO_URL;
const SECONDS = 30;
const MILISECONDS = 1000;
const TIMEOUT = SECONDS * MILISECONDS;

const VidiemServer = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
});

VidiemServer.interceptors.request.use(function (config) {
    const CUSTOMER_TOKEN = getLocalStorage(CONSTANTS.CUSTOMER_TOKEN)

    if (CUSTOMER_TOKEN) {
        config.headers["Authorization"] = `${CUSTOMER_TOKEN}`
    }

    return config;
});

VidiemServer.interceptors.response.use((response) => {
    return response
}, (error) => {
    if (error.response.status === 400) {
        return Promise.reject(error?.response.data)
    }
    if (error.response.status === 401) {
        return Promise.reject(error?.response.data)
    }
    if (error.response.status === 403) {

    }
    if (error.response.status === 404) {

    }
    if (error.response.status === 500) {

    }
    if (error.response.status === 508) {

    }
    if (error.response.status === 412) {
        return Promise.reject(error?.response.data)
    }

    return Promise.reject(error)
})

export default VidiemServer
