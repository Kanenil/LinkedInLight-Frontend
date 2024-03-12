import {Outlet} from "react-router-dom";
import AuthFooter from "../Footer/AuthFooter";

const AuthLayout = () => {
    return(
        <>
            <Outlet/>
            <AuthFooter/>
        </>
    )
}
export default AuthLayout;