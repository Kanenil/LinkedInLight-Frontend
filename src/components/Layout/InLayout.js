import React, {useEffect} from 'react'
import {Outlet} from "react-router-dom";
import InHeader from "../Header/InHeader";
import InFooter from "../Footer/InFooter";
import {useAuthorize} from "../../hooks/authorize";
import {general} from "../../constants/general";
import {routes} from "../../constants/routes";
import {useNavigate} from "react-router";
import ConditionalWrapper from "../../elements/ConditionalWrapper/ConditionalWrapper";

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
            </React.Fragment>
        </ConditionalWrapper>
    )
}
export default InLayout;