import Axios from 'axios';
import {APP_ENV} from "../env";
import {general} from "../constants/general";

const token = localStorage.getItem(general.token);

const axios = Axios.create({
    baseURL: APP_ENV.REMOTE_HOST_NAME,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
});

axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;


export default axios;