import ProfileButton from "../../../elements/buttons/ProfileButton";
import PencilButton from "../../../elements/buttons/PencilButton";
import React from "react";
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper";

const SectionHeaderBlock = ({title, buttonTitle, onPencilClickTo, link, margin = "", isOwner}) => {
    return (
        <div className={`flex flex-row font-jost ${margin}`}>
            <h1 className="font-medium text-2xl text-[#2D2A33]">{title}</h1>

            <ConditionalWrapper condition={isOwner}>
                <PencilButton to={onPencilClickTo} className="ml-3.5"/>

                <div className="ml-auto">
                    <ProfileButton title={buttonTitle} to={link}/>
                </div>
            </ConditionalWrapper>
        </div>
    )
}
export default SectionHeaderBlock;