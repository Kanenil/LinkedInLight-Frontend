import {Link} from "react-router-dom";
import React from "react";

const UnderlinedLink = ({ children, to, className }) => {
    return (
        <Link to={to} className={`text-[#2D2A33] font-light hover:underline active:font-normal active:no-underline ${className}`}>
            {children}
        </Link>
    )
}
export default UnderlinedLink;