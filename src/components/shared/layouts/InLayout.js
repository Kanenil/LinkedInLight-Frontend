import React, {useEffect} from 'react'
import {Outlet} from "react-router-dom";
import InHeader from "../headers/InHeader";
import InFooter from "../footers/InFooter";
import {useAuthorize} from "../../../hooks/useAuthorize";
import {general} from "../../../constants/general";
import {routes} from "../../../constants/routes";
import {useNavigate} from "react-router";
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper";
import MinimizedChat from "../../chats/MinimizedChat";

const InLayout = () => {
    const navigator = useNavigate();
    const isAuth = useAuthorize();

    useEffect(() => {
        if(!isAuth && !localStorage.getItem(general.token)) {
            navigator(routes.signIn);
        }
    }, [navigator, isAuth])

    return (
        <ConditionalWrapper condition={isAuth}>
            <React.Fragment>
                <InHeader/>
                <Outlet/>
                <InFooter/>
                <MinimizedChat/>
            </React.Fragment>
        </ConditionalWrapper>
    )
}
export default InLayout;