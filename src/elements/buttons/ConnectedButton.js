import React from "react";
import ConditionalWrapper from "../shared/ConditionalWrapper";
import {Link} from "react-router-dom";
import {XMarkIcon} from "@heroicons/react/20/solid";

const ConnectedButton = ({className, to, onClick, children, ...props}) => {
    return (
        <React.Fragment>
            <ConditionalWrapper condition={to}>
                <Link
                    className={`flex flex-row gap-2.5 items-center mt-[5px] w-fit px-2.5 py-[5px] text-sm rounded-full bg-[#3967DB] text-white border-[1px] border-[#3967DB] hover:border-[#24459A] active:border-[#24459A] active:border-[1.5px]  active:bg-[#E4EAFF] ${className}`}
                    to={to}
                    {...props}
                >
                    {children}

                    <XMarkIcon className="h-3 fill-white"/>
                </Link>
            </ConditionalWrapper>
            <ConditionalWrapper condition={onClick}>
                <button
                    className={`flex flex-row gap-2.5 items-center mt-[5px] w-fit px-2.5 py-[5px] text-sm rounded-full bg-[#3967DB] text-white border-[1px] border-[#3967DB] hover:border-[#24459A] active:border-[#24459A] active:border-[1.5px] ${className}`}
                    onClick={onClick}
                    {...props}
                >
                    {children}

                    <XMarkIcon className="h-5 fill-white"/>
                </button>
            </ConditionalWrapper>
        </React.Fragment>
    )
}
export default ConnectedButton;