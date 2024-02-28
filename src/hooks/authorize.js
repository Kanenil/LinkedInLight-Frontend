import {general} from "../constants/general";
import {useNavigate} from "react-router";
import {routes} from "../constants/routes";
import {useEffect} from "react";

export const useAuthorize = () => {
    const navigator = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem(general.token);

        if(!token)
            navigator(routes.logIn);

        //Todo: Add a check from any endpoint where credentials (Bearer token) are required. For example user info end point
    }, [])
}