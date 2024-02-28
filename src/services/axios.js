import Axios from 'axios';
import {APP_ENV} from "../env";

const axios = Axios.create({
    baseURL: APP_ENV.REMOTE_HOST_NAME,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
});

export default axios;