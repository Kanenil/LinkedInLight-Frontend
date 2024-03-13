import {general} from "../constants/general";
import {useNavigate} from "react-router";
import {useEffect} from "react";

export const useAuthguard = () => {
    const navigator = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem(general.token);

        if(token)
            navigator('/in');

    }, [navigator])
}