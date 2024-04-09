import React, {useEffect} from 'react'
import {Outlet} from "react-router-dom";
import AuthFooter from "../footers/AuthFooter";
import {useAuthorize} from "../../../hooks/useAuthorize";
import {useNavigate} from "react-router";
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper";

const AuthLayout = () => {
    const navigator = useNavigate();
    const isAuth = useAuthorize();

    useEffect(() => {
        if(isAuth) {
            navigator('/j4y');
        }
    }, [navigator, isAuth])

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