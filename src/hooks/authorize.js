import {general} from "../constants/general";
import {useNavigate} from "react-router";
import {routes} from "../constants/routes";
import {useEffect} from "react";
import {profileService} from "../services/profileService";

export const useAuthorize = () => {
    const navigator = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem(general.token);

        if(!token)
            navigator(routes.signIn);

        console.log(token)

        profileService.profile().then()
            .catch(() => {
                navigator(routes.signIn)
            })
    }, [navigator])
}