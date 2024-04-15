import React, {useEffect} from 'react'
import {Outlet} from "react-router-dom";
import AuthFooter from "../footers/AuthFooter";
import {useAuthorize} from "../../../hooks/useAuthorize";
import {useNavigate} from "react-router";
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper";
import useMobileDetector from "../../../hooks/useMobileDetector";

const AuthLayout = () => {
    const navigator = useNavigate();
    const isAuth = useAuthorize();
    const {isMobile} = useMobileDetector();

    useEffect(() => {
        if(isAuth) {
            navigator('/j4y');
        }
    }, [navigator, isAuth])

    useEffect(() => {
        if(isMobile)
            navigator('/m/auth', {replace:true})
    }, [isMobile])

    return(
        <ConditionalWrapper condition={!isAuth}>
            <React.Fragment>
                <Outlet/>
                <AuthFooter/>
            </React.Fragment>
        </ConditionalWrapper>
    )
}
export default AuthLayout;