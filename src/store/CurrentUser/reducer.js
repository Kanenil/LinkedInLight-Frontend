import {general} from "../../constants/general";
import axios from "../../services/axios";

const token = localStorage.getItem(general.token);

axios.defaults.headers.common.Authorization = token? `Bearer ${token}`:null;

const defaultState = null;
const CurrentUser = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...action.current_user };
        default:
            return state;
    }
};
export default CurrentUser;
