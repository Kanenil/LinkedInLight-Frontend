import React from "react";

const ModalTextareaFormGroup = ({
                                    value,
                                    rows = 7,
                                    onChange,
                                    name,
                                    title,
                                    className = "pt-[5px] pb-[10px] pr-[20px] gap-[5px]"
                                }) => {
    return (
        <div className={className}>
            <label htmlFor={name} className="font-jost text-[#2D2A33]">{title}</label>

            <textarea
                name={name}
                id={name}
                className="mt-[15px] resize-none w-full border-[0.5px] border-[#556DA9] rounded-lg text-sm font-jost font-light"
                onChange={onChange}
                value={value}
                rows={rows}
            />
        </div>
    )
}
export default ModalTextareaFormGroup;