import React from "react";
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper";

const ModalCheckFormGroup = ({
                                 value,
                                 error = false,
                                 onChange,
                                 name,
                                 title,
                                 disabled = false,
                                 className = "pt-[5px] pb-[10px] pr-[20px] gap-[5px]",
                                 errorChildren
                             }) => {
    return (
        <div className={className}>
            <label
                className="flex items-center cursor-pointer select-none"
                htmlFor={name}>
                <div className="relative">
                    <input name={name}
                           checked={value}
                           onChange={onChange}
                           className="hidden"
                           disabled={disabled}
                           type="checkbox"
                           id={name}/>
                    <div
                        className="box flex items-center justify-center w-[20px] h-[20px] rounded-sm border border-[#2D2A33] mr-2"
                    >
                        <span className={value === false ? "opacity-0" : ""}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                 className="ml-1 mb-1"
                                 viewBox="0 0 15 16" fill="none">
                                <path
                                    d="M6.84173 15.9998C6.79635 15.9998 6.75147 15.9885 6.7099 15.9664C6.66833 15.9444 6.63098 15.9122 6.60018 15.8719L0.0873947 7.34121C0.0439788 7.28433 0.0151968 7.21337 0.00457124 7.137C-0.00605429 7.06063 0.00193752 6.98216 0.0275687 6.9112C0.0531998 6.84025 0.0953585 6.77988 0.148885 6.73748C0.202411 6.69509 0.264983 6.67251 0.328943 6.6725H3.46384C3.51091 6.67251 3.55743 6.68474 3.60026 6.70837C3.64309 6.73201 3.68124 6.76648 3.71213 6.80949L5.88873 9.84167C6.12396 9.2328 6.57933 8.21899 7.37841 6.98363C8.55974 5.15733 10.7571 2.47141 14.5164 0.0467428C14.5891 -0.000110954 14.6736 -0.0122714 14.7533 0.0126629C14.833 0.0375972 14.9021 0.0978135 14.947 0.181422C14.9918 0.26503 15.0091 0.365952 14.9955 0.46426C14.9818 0.562568 14.9383 0.651115 14.8733 0.712418C14.859 0.726001 13.4095 2.10818 11.7413 4.63987C10.2061 6.96965 8.16519 10.7792 7.16094 15.6973C7.1433 15.7837 7.10227 15.8604 7.04439 15.9153C6.98652 15.9702 6.91523 15.9998 6.84173 15.9998Z"
                                    fill="#24459A"/>
                            </svg>
                        </span>
                    </div>
                </div>
                <span className="text-sm text-[#7D7D7D]">{title}</span>
            </label>
            <ConditionalWrapper condition={error}>
                {errorChildren}
            </ConditionalWrapper>
        </div>
    )
}
export default ModalCheckFormGroup;