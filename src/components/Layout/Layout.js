import Header from "../Header/Header";
import {Outlet} from "react-router-dom";
import InFooter from "../Footer/InFooter";

const Layout = () => {

    return(
        <>
            <Header/>
            <Outlet/>
            <InFooter/>
        </>
    )
}
export default Layout;