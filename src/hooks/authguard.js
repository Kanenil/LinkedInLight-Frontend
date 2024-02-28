import {general} from "../constants/general";
import {useNavigate} from "react-router";
import {useEffect} from "react";
import {useSelector} from "react-redux";

export const useAuthguard = () => {
    const navigator = useNavigate();

    const user = useSelector((state)=>state.CurrentUser);

    useEffect(() => {
        const token = localStorage.getItem(general.token);

        if(token && user.userName)
            navigator('/');

    }, [])
}