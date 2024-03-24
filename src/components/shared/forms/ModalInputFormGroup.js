import React from "react";
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper";

const ModalInputFormGroup = ({
                                 value,
                                 error = false,
                                 onChange,
                                 name,
                                 type = "text",
                                 title,
                                 className = "pt-[5px] pb-[10px] pr-[20px] gap-[5px]",
                                 children,
                                 errorChildren
                             }) => {
    return (
        <div className={className}>
            <label htmlFor={name} className="font-jost text-[#2D2A33]">{title}</label>

            <input
                name={name}
                id={name}
                type={type}
                value={value}
                onChange={onChange}
                className="w-full rounded-[4px] border-[0.5px] border-[#556DA9] py-[5px] px-2.5 text-[#7D7D7D] text-sm"
            />
            {children}
            <ConditionalWrapper condition={error}>
                {errorChildren}
            </ConditionalWrapper>
        </div>
    )
}
export default ModalInputFormGroup;