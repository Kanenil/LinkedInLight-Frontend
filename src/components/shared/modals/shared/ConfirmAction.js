import XMarkIcon from "../../../../elements/icons/XMarkIcon";
import SecondaryButton from "../../../../elements/buttons/SecondaryButton";
import PrimaryButton from "../../../../elements/buttons/PrimaryButton";
import React from "react";

const ConfirmAction = ({ onClose, onConfirm, action, title }) => {
    return (
        <div className="flex flex-col gap-1 p-5 w-[351px]"
             style={{boxShadow: "0px 0px 8px 2px #00000066"}}>
            <div className="flex flex-row py-2.5">
                <h1 className="font-jost font-semibold text-[#2D2A33] text-xl">{title}</h1>

                <button onClick={onClose} className="ml-auto">
                    <XMarkIcon className="fill-[#7D7D7D] h-4"/>
                </button>
            </div>

            <h3 className="border-t-[0.5px] border-[#24459A80] pt-6 pb-4 text-sm">
                {action}
            </h3>

            <div className="flex justify-end pt-2.5 pb-1 gap-2">
                <SecondaryButton onClick={onClose}>
                    Cancel
                </SecondaryButton>

                <PrimaryButton onClick={onConfirm}>
                    Confirm
                </PrimaryButton>
            </div>
        </div>
    )
}
export default ConfirmAction;