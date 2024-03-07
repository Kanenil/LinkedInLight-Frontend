import {general} from "../constants/general";
import {useNavigate} from "react-router";
import {routes} from "../constants/routes";
import {useEffect} from "react";
import {useSelector} from "react-redux";

export const useAuthorize = () => {
    const navigator = useNavigate();

    const user = useSelector((state)=>state.CurrentUser);

    useEffect(() => {
        const token = localStorage.getItem(general.token);

        if(!token && !user.userName)
            navigator(routes.logIn);

        //Todo: Add a check from any endpoint where credentials (Bearer token) are required. For example user info end point
    }, [user, navigator])
}