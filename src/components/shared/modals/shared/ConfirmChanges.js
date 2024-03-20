import XMarkIcon from "../../../../elements/icons/XMarkIcon";
import React from "react";

const ConfirmChanges = ({ onClose, onConfirm }) => {

    return (
        <div className="flex flex-col gap-1 p-5 w-[351px]"
             style={{boxShadow: "0px 0px 8px 2px #00000066"}}>
            <div className="flex flex-row py-2.5">
                <h1 className="font-jost font-semibold text-[#2D2A33] text-xl">Discard changes</h1>

                <button onClick={onClose} className="ml-auto">
                    <XMarkIcon className="fill-[#7D7D7D] h-4"/>
                </button>
            </div>

            <h3 className="border-t-[0.5px] border-[#24459A80] pt-6 pb-4 text-sm">
                Are you want discard changes?
            </h3>

            <div className="flex justify-end pt-2.5 pb-1 gap-2">
                <button onClick={onClose}
                       className="font-jost py-1 px-5 rounded-full border-[1px] border-[#24459A] text-[#556DA9] text-sm">
                    Cancel
                </button>

                <button onClick={onConfirm}
                        className="font-jost py-1 px-5 rounded-full bg-[#24459A] text-white text-sm">
                    Discard
                </button>
            </div>
        </div>
    )
}
export default ConfirmChanges;