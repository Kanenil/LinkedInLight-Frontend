import XMarkIcon from "../../../elements/icons/XMarkIcon";
import React from "react";

const ModalHeader = ({ onClose, title, withBorder = true }) => {
    return (
        <div className={`flex flex-row pt-2.5 pb-5 ${withBorder? "border-b-[0.5px] border-[#24459A80]": ""}`}>
            <h1 className="font-jost font-semibold text-[#2D2A33] text-xl">
                {title}
            </h1>

            <button type="button" onClick={onClose} className="ml-auto">
                <XMarkIcon className="fill-[#7D7D7D] h-4"/>
            </button>
        </div>
    )
}
export default ModalHeader;