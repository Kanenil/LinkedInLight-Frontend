import Header from "../headers/Header";
import {Outlet} from "react-router-dom";
import Footer from "../footers/Footer";
import {useNavigate} from "react-router";
import {useAuthorize} from "../../../hooks/authorize";
import {useEffect} from "react";
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper";

const Layout = () => {
    const navigator = useNavigate();
    const isAuth = useAuthorize();

    useEffect(() => {
        if(isAuth) {
            navigator('/in');
        }
    }, [navigator, isAuth])

    return(
        <ConditionalWrapper condition={!isAuth}>
            <Header/>
            <Outlet/>
            <Footer/>
        </ConditionalWrapper>
    )
}
export default Layout;