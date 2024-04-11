import useComponentVisible from "../../hooks/useComponentVisible";
import React, {useRef} from "react";
import {EllipsisHorizontalIcon} from "@heroicons/react/24/solid";
import {TrashIcon} from "@heroicons/react/24/outline";

const ConnectionOptions = ({onChange}) => {
    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false);
    const dropdownContentRef = useRef(null);

    const onChangeHandler = async (e) => {
        const {value} = e;

        onChange(value);

        setIsComponentVisible(false);
    }

    return (
        <div className="relative z-40 ml-auto my-auto" ref={ref}>
            <button className="hover:bg-gray-100 rounded-full p-1" onClick={() => setIsComponentVisible(prev => !prev)}>
                <EllipsisHorizontalIcon className="w-6 h-6"/>
            </button>
            <div ref={dropdownContentRef}
                 className={`${
                     isComponentVisible ? '' : 'hidden'
                 } top-6 absolute -left-24 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
            >
                <div className="py-1">
                    <button
                        onClick={() => onChangeHandler(true)}
                        className="flex flex-row gap-3 items-center w-full flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                        <TrashIcon className="w-5 h-5"/>

                        Remove connection
                    </button>
                </div>
            </div>
        </div>
    )
}
export default ConnectionOptions;