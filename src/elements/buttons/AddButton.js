import React from "react";
import ConditionalWrapper from "../shared/ConditionalWrapper";
import {Link} from "react-router-dom";
import PlusIcon from "../icons/PlusIcon";

const AddButton = ({className, to, onClick, children, ...props}) => {
    return (
        <React.Fragment>
            <ConditionalWrapper condition={to}>
                <Link
                    className={`group flex flex-row gap-2.5 items-center mt-[5px] w-fit px-2.5 py-[5px] text-sm rounded-full border-[1px] border-[#7D88A4] text-[#7D88A4] hover:border-[#24459A] hover:text-[#556DA9] active:text-[#24459A] active:border-[#24459A] active:border-[1.5px]  active:bg-[#E4EAFF] ${className}`}
                    to={to}
                    onClick={onClick}
                    {...props}
                >
                    <PlusIcon
                        className="fill-[#7D88A4] group-hover:fill-[#556DA9] group-active:fill-[#24459A] h-3"/>

                    {children}
                </Link>
            </ConditionalWrapper>
            <ConditionalWrapper condition={onClick && !to}>
                <button
                    className={`group flex flex-row gap-2.5 items-center mt-[5px] w-fit px-2.5 py-[5px] text-sm rounded-full border-[1px] border-[#7D88A4] text-[#7D88A4] hover:border-[#24459A] hover:text-[#556DA9] active:text-[#24459A] active:border-[#24459A] active:border-[1.5px]  active:bg-[#E4EAFF] ${className}`}
                    onClick={onClick}
                    {...props}
                >
                    <PlusIcon
                        className="fill-[#7D88A4] group-hover:fill-[#556DA9] group-active:fill-[#24459A] h-3"/>

                    {children}
                </button>
            </ConditionalWrapper>
        </React.Fragment>
    )
}
export default AddButton;