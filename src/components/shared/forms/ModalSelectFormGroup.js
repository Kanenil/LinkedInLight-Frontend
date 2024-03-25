import TextDown from "../../../elements/shared/TextDown";
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper";
import React from "react";

const ModalSelectFormGroup = ({
                                  value,
                                  options,
                                  error,
                                  hasTools = false,
                                  clearOnSelect = false,
                                  onEnterSelect = true,
                                  placeHolder,
                                  onChange,
                                  searchAble = true,
                                  containerWidth = 665,
                                  containerHeightMax = 100,
                                  errorChildren,
                                  title,
                                  className = "pt-[5px] pb-[10px] pr-[20px] gap-[5px]"
                              }) => {
    return (
        <div className={className}>
            <h1 className="font-jost text-[#2D2A33]">{title}</h1>

            <TextDown
                className="mt-[5px]"
                value={value}
                options={options}
                containerWidth={containerWidth}
                containerHeightMax={containerHeightMax}
                placeHolder={placeHolder}
                error={error}
                onEnterSelect={onEnterSelect}
                searchAble={searchAble}
                hasTools={hasTools}
                clearOnSelect={clearOnSelect}
                onChange={onChange}
            />
            <ConditionalWrapper condition={error}>
                {errorChildren}
            </ConditionalWrapper>
        </div>
    )
}
export default ModalSelectFormGroup;