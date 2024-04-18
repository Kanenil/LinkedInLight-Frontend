import useOverflow from "../../../hooks/useOverflow";
import ModalHeader from "../modals/ModalHeader";
import React from "react";
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper";
import PrimaryButton from "../../../elements/buttons/PrimaryButton";
import useMobileDetector from "../../../hooks/useMobileDetector";
import classNames from "classnames";

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
    const {isMobile} = useMobileDetector();

    return (
        <div className={classNames("flex flex-col", {
            "px-6 py-6 bg-white h-screen w-screen": isMobile,
            "gap-2.5 py-5 px-8 w-[750px]": !isMobile
        })} style={{boxShadow: "0px 0px 8px 2px #00000066"}}>
            <ModalHeader title={header} onClose={onClose}/>

            <div
                id="container"
                ref={containerRef}
                className={classNames("overflow-x-hidden", {
                    "max-h-[60vh]": !isMobile,
                    "max-h-[90vh]": isMobile,
                    "overflow-y-scroll": isOverflow,
                    "overflow-y-hidden": !isOverflow
                })}
            >
                <div className="flex flex-col gap-2.5" ref={contentRef}>
                    {children}
                </div>
            </div>

            <div className={classNames("flex justify-end pt-2.5 pb-1 gap-5", {
                "border-t-[0.5px] border-[#24459A80]": withBorder && !isMobile,
                "mt-auto": isMobile
            })}>
                <ConditionalWrapper condition={isEdit}>
                    <button onClick={onRemove} className={classNames("mr-auto text-[#24459A] font-medium hover:underline", {
                        "w-full": isMobile
                    })}>
                        Remove {removeTitle}
                    </button>
                </ConditionalWrapper>

                <PrimaryButton className={isMobile?'w-full':''} onClick={onSubmit}>
                    Save
                </PrimaryButton>
            </div>
        </div>
    )
}
export default EditModalForm;