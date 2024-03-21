import React, {useEffect, useRef, useState} from "react";
import ChevronDownIcon from "../icons/ChevronDownIcon";
import useComponentVisible from "../../hooks/componentVisible";
import useOverflow from "../../hooks/overflow";
import ConditionalWrapper from "./ConditionalWrapper";

const TextDown = ({placeHolder, options, className, onChange, error, hasTools = true, searchAble = true, containerHeightMax=100, containerWidth=272}) => {
    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false);
    const [selectedValue, setSelectedValue] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const {isOverflow, containerRef, contentRef} = useOverflow();
    const searchRef = useRef();
    const inputRef = useRef();

    useEffect(() => {
        if(!placeHolder)
            setSearchValue("");
        if (isComponentVisible && searchRef.current) {
            searchRef.current.focus();
        }
    }, [isComponentVisible]);

    const handleInputClick = (e) => {
        setIsComponentVisible((val) => !val);
    };

    const getDisplay = () => {
        if (!selectedValue || selectedValue.length === 0) {
            return placeHolder || searchValue;
        }
        return selectedValue.label;
    };

    const onItemClick = (option) => {
        setSelectedValue(option);
        setIsComponentVisible(false)
        onChange(option);
    };

    const onSearch = (e) => {
        setSearchValue(e.target.value);
    };

    const getOptions = () => {
        if (!searchValue) {
            return options;
        }

        return options.filter(
            (option) =>
                option.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
        );
    };

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            onItemClick({label: searchValue, value: searchValue})
        }
    };

    return (
        <div ref={ref} className={`relative ${className}`}>
            <ConditionalWrapper condition={(!isComponentVisible && (!!searchValue || !!selectedValue || !!placeHolder)) || !searchAble}>
                <div ref={inputRef} onClick={handleInputClick}
                     className={`flex flex-row items-center w-full py-[5px] px-2.5 rounded-[4px] border-[0.5px] ${error?'border-[#9E0F20]':'border-[#556DA9]'}`}>
                    <div className="font-jost text-sm text-[#7D88A4] cursor-pointer">{getDisplay()}</div>

                    <ConditionalWrapper condition={hasTools}>
                        <ChevronDownIcon className="ml-auto w-3 fill-[#7D7D7D]"/>
                    </ConditionalWrapper>
                </div>
            </ConditionalWrapper>

            <div ref={inputRef} onClick={e => e.stopPropagation()}
                 className={`flex flex-row items-center w-full rounded-[4px] overflow-hidden border-[0.5px] ${error?'border-[#9E0F20]':'border-[#556DA9]'} ${(isComponentVisible && searchAble) || (!isComponentVisible && !searchValue && !placeHolder && !selectedValue && searchAble)?'':'hidden'}`}>
                <input onClick={e =>{e.stopPropagation(); setIsComponentVisible(true)}} onChange={onSearch} onKeyDown={handleKeyDown} value={searchValue} ref={searchRef}
                       className="test w-full py-[5px] px-2.5 border-0 font-jost text-sm text-[#7D88A4]"/>

                <ConditionalWrapper condition={hasTools}>
                    <ChevronDownIcon onClick={handleInputClick} className="ml-auto mr-2.5 w-3 fill-[#7D7D7D]"/>
                </ConditionalWrapper>
            </div>

            <div id="container" ref={containerRef}
                 className={`max-h-[${containerHeightMax}px] w-[${containerWidth}px] mt-2 py-[5px] px-[20px] overflow-x-hidden overflow-y-${isOverflow ? 'scroll' : 'hidden'} ${isComponentVisible && getOptions().length > 0 ? "" : "hidden"}`}
                 style={{boxShadow: "0px 1px 6px 0px #00000040"}}>
                <div ref={contentRef}>
                    {
                        getOptions().map((option) => (
                            <div onClick={() => onItemClick(option)} key={option.value}
                                 className="cursor-pointer active:font-medium py-1 px-2.5 font-jost text-[#2D2A33] font-sm font-light">
                                {option.label}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
export default TextDown;