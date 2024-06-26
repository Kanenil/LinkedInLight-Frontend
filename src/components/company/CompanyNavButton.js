import classNames from "classnames";
import React from "react";
import {twMerge} from "tailwind-merge";

const CompanyNavButton = ({children, isActive, onClick, className}) => {
    return (
        <button
            className={classNames(twMerge("border-b-[1px] font-jost text-lg w-[105px] md:w-[150px] py-1.5 text-[#585359]", className), {
                "border-b-[#24459A] font-semibold": isActive,
                "border-b-[#24459A]/50": !isActive
            })}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
export default CompanyNavButton;