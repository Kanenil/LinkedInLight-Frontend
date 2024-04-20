import classNames from "classnames";
import React from "react";

const CompanyNavButton = ({children, isActive, onClick}) => {
    return (
        <button
            className={classNames("border-b-[1px] font-jost text-lg w-[105px] md:w-[150px] py-1.5 text-[#585359]", {
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