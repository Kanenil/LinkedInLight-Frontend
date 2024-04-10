import {EllipsisVerticalIcon} from "@heroicons/react/24/solid";
import useComponentVisible from "../../../hooks/useComponentVisible";
import React, {useRef} from "react";

const options = [
    {label:'Delete for me',value:true},
    {label:'Delete for everyone',value:false}
]

const ChatOptionButton = ({onChange}) => {
    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false);
    const dropdownContentRef = useRef(null);
    //const {t, i18n} = useTranslation();

    const onChangeHandler = async (e) => {
        const {value} = e;

        onChange(value);

        setIsComponentVisible(false);
    }

    return (
        <div className="relative z-40 ml-auto my-auto" ref={ref}>
            <button onClick={() => setIsComponentVisible(prev => !prev)}>
                <EllipsisVerticalIcon className="w-8 h-8 fill-[#24459A]"/>
            </button>
            <div ref={dropdownContentRef}
                 className={`${
                     isComponentVisible ? '' : 'hidden'
                 } top-10 absolute -left-24 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
            >
                <div className="py-1">
                    {options.map((option, index) => (
                        <button
                            onClick={() => onChangeHandler(option)}
                            key={index}
                            className="block w-full flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default ChatOptionButton;