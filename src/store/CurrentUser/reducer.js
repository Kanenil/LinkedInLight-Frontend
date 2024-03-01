import {general} from "../../constants/general";
import axios from "../../services/axios";

const token = localStorage.getItem(general.token);
const user = JSON.parse(localStorage.getItem(general.currentUser) || "{}");

axios.defaults.headers.common.Authorization = `Bearer ${token}`;

const defaultState = {
    ...user
};
const CurrentUser = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, ...action.current_user };
        default:
            return state;
    }
};
export default CurrentUser;
