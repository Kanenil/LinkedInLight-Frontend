import {Outlet} from "react-router-dom";
import InHeader from "../Header/InHeader";
import InFooter from "../Footer/InFooter";
import {useAuthorize} from "../../hooks/authorize";

const InLayout = () => {
    useAuthorize()

    return (
        <>
            <InHeader/>
            <Outlet/>
            <InFooter/>
        </>
    )
}
export default InLayout;