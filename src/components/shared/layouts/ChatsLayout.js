import {useNavigate} from "react-router";
import {useAuthorize} from "../../../hooks/useAuthorize";
import React, {useEffect} from "react";
import {general} from "../../../constants/general";
import {routes} from "../../../constants/routes";
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper";
import InHeader from "../headers/InHeader";
import {Outlet} from "react-router-dom";
import AuthFooter from "../footers/AuthFooter";
import MinimizedChat from "../../chats/minimized/MinimizedChat";
import SocketProvider from "../../../providers/SocketProvider";

const ChatsLayout = () => {
    const navigator = useNavigate();
    const isAuth = useAuthorize();

    useEffect(() => {
        if (!isAuth && !localStorage.getItem(general.token)) {
            navigator(routes.signIn);
        }
    }, [navigator, isAuth])

    return (
        <ConditionalWrapper condition={isAuth}>
            <SocketProvider>
                <InHeader/>
                <Outlet/>
                <AuthFooter/>
                <MinimizedChat/>
            </SocketProvider>

        </ConditionalWrapper>
    )
}
export default ChatsLayout;