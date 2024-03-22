import ProfileButton from "../../../elements/buttons/ProfileButton";
import PencilButton from "../../../elements/buttons/PencilButton";
import React from "react";

const SectionHeaderBlock = ({title, buttonTitle, onPencilClick, onAddClick, margin = ""}) => {
    return (
        <div className={`flex flex-row font-jost ${margin}`}>
            <h1 className="font-medium text-2xl text-[#2D2A33]">{title}</h1>

            <PencilButton onClick={onPencilClick} className="ml-3.5"/>

            <div className="ml-auto">
                <ProfileButton title={buttonTitle} onClickHandler={onAddClick}/>
            </div>
        </div>
    )
}
export default SectionHeaderBlock;