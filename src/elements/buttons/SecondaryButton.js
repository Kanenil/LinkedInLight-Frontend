import React from "react";
import ConditionalWrapper from "../shared/ConditionalWrapper";
import {Link} from "react-router-dom";

const SecondaryButton = ({className, to, onClick, children, ...props}) => {
    return (
        <React.Fragment>
            <ConditionalWrapper condition={to}>
                <Link
                    className={`cursor-pointer font-jost py-1 px-5 rounded-full border-[1px] border-[#24459A] text-[#556DA9] border-[1.5px] hover:border-[#24459A] hover:bg-[#E4EAFF] hover:text-[#24459A] transition duration-300 ease-in-out text-sm ${className}`}
                    to={to}
                    {...props}
                >
                    {children}
                </Link>
            </ConditionalWrapper>
            <ConditionalWrapper condition={onClick}>
                <button
                    className={`cursor-pointer font-jost py-1 px-5 rounded-full border-[1px] border-[#24459A] text-[#556DA9] border-[1.5px] hover:border-[#24459A] hover:bg-[#E4EAFF] hover:text-[#24459A] transition duration-300 ease-in-out text-sm ${className}`}
                    onClick={onClick}
                    {...props}
                >
                    {children}
                </button>
            </ConditionalWrapper>
        </React.Fragment>


    )
}
export default SecondaryButton;