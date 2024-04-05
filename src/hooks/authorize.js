import {general} from "../constants/general";
import {useEffect, useState} from "react";
import ProfileService from "../services/profileService";

export const useAuthorize = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem(general.token);

        if (!token) {
            setIsAuthorized(false);
            return;
        }

        ProfileService.getProfile()
            .then(() => {
                setIsAuthorized(true);
            })
            .catch((error) => {
                console.error("Authentication failed:", error);
                localStorage.removeItem(general.token);
                setIsAuthorized(false);
            });
    }, [])

    return isAuthorized;
}