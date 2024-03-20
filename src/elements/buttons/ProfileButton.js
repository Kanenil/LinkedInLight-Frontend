import React from "react";
import ConditionalWrapper from "../shared/ConditionalWrapper";
import {Link} from "react-router-dom";

const ProfileButton = ({title, to, onClickHandler, ...props}) => {
    return (
        <React.Fragment>
            <ConditionalWrapper condition={onClickHandler && !to}>
                <button
                    onClick={onClickHandler}
                    className="border-[#24459A] border-[1px] rounded-full py-1.5 px-6 font-jost text-[#556DA9] hover:bg-[#E5F2FC] hover:border-[#24459A] hover:border-[1.5px] hover:text-[#556DA9] text-sm"
                    {...props}
                >
                    {title}
                </button>
            </ConditionalWrapper>
            <ConditionalWrapper condition={to && !onClickHandler}>
                <Link
                    to={to}
                    className="border-[#24459A] border-[1px] rounded-full py-1.5 px-6 font-jost text-[#556DA9] hover:bg-[#E5F2FC] hover:border-[#24459A] hover:border-[1.5px] hover:text-[#556DA9] text-sm"
                    {...props}
                >
                    {title}
                </Link>
            </ConditionalWrapper>
        </React.Fragment>

    )
}
export default ProfileButton;