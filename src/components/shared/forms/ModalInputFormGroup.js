import React from "react";
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper";
import classNames from "classnames";

const ModalInputFormGroup = ({
                                 value,
                                 error = false,
                                 onChange,
                                 name,
                                 type = "text",
                                 title,
                                 placeholder = '',
                                 className = "pt-[5px] pb-[10px] pr-[20px] gap-[5px]",
                                 children,
                                 errorChildren,
                                 disabled = false
                             }) => {
    return (
        <div className={className}>
            <label htmlFor={name} className="font-jost text-[#2D2A33]">{title}</label>

            <input
                name={name}
                id={name}
                type={type}
                value={value}
                disabled={disabled}
                onChange={onChange}
                placeholder={placeholder}
                className={classNames("w-full rounded-[4px] border-[0.5px] focus:border-[1.5px] focus:font-semibold focus:text-[#2D2A33] py-[5px] px-2.5 text-[#7D7D7D] text-sm", {
                    "border-[#B4BFDD] focus:border-[#24459A] focus:bg-[#F5F8FF]": !error,
                    "border-[#9E0F20]": error
                })}
            />
            {children}
            <ConditionalWrapper condition={error}>
                {errorChildren}
            </ConditionalWrapper>
        </div>
    )
}
export default ModalInputFormGroup;