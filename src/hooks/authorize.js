import {general} from "../constants/general";
import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {profileService} from "../services/profileService";

export const useAuthorize = () => {
    const navigator = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem(general.token);

        if (!token) {
            setIsAuthorized(false);
            return;
        }

        profileService.profile()
            .then(() => {
                setIsAuthorized(true);
            })
            .catch((error) => {
                console.error("Authentication failed:", error);
                localStorage.removeItem(general.token);
                setIsAuthorized(false);
            });
    }, [navigator])

    return isAuthorized;
}