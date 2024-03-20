import Header from "../headers/Header";
import {Outlet} from "react-router-dom";
import Footer from "../footers/Footer";

const Layout = () => {

    return(
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}
export default Layout;