import useOverflow from "../../../hooks/useOverflow";
import ModalHeader from "../modals/ModalHeader";
import React from "react";
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper";
import PrimaryButton from "../../../elements/buttons/PrimaryButton";

const EditModalForm = ({
                           header,
                           onClose,
                           children,
                           isEdit,
                           onRemove,
                           onSubmit,
                           removeTitle,
                           withBorder = true
                       }) => {
    const {isOverflow, containerRef, contentRef} = useOverflow();

    return (
        <div className="flex flex-col gap-2.5 py-5 px-8 w-[750px]"
             style={{boxShadow: "0px 0px 8px 2px #00000066"}}>
            <ModalHeader title={header} onClose={onClose}/>

            <div
                id="container"
                ref={containerRef}
                className={`max-h-[60vh] overflow-x-hidden overflow-y-${isOverflow ? 'scroll' : 'hidden'}`}
            >
                <div className="flex flex-col gap-2.5" ref={contentRef}>
                    {children}
                </div>
            </div>

            <div className={`flex justify-end pt-2.5 pb-1 gap-5 ${withBorder?'border-t-[0.5px] border-[#24459A80]':''}`}>
                <ConditionalWrapper condition={isEdit}>
                    <button onClick={onRemove} className="mr-auto text-[#24459A] font-medium hover:underline">
                        Remove {removeTitle}
                    </button>
                </ConditionalWrapper>

                <PrimaryButton onClick={onSubmit}>
                    Save
                </PrimaryButton>
            </div>
        </div>
    )
}
export default EditModalForm;