import PencilIcon from "../icons/PencilIcon";
import {Link} from "react-router-dom";
import React from "react";
import ConditionalWrapper from "../shared/ConditionalWrapper";

const PencilButton = ({ to, onClick, className, ...props }) => {
    return (
        <React.Fragment>
            <ConditionalWrapper condition={to}>
                <Link to={to} onClick={onClick} className={className}>
                    <PencilIcon className="w-5 stroke-[#24459A] fill-[#24459A]"/>
                </Link>
            </ConditionalWrapper>
            <ConditionalWrapper condition={onClick && !to}>
                <button onClick={onClick} className={className}>
                    <PencilIcon className="w-5 stroke-[#24459A] fill-[#24459A]"/>
                </button>
            </ConditionalWrapper>
        </React.Fragment>
    )
}
export default PencilButton;