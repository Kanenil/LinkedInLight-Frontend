import useComponentVisible from "../../../hooks/useComponentVisible";
import React, {useRef} from "react";
import {EllipsisVerticalIcon} from "@heroicons/react/24/solid";

const options = [
    {label: 'Edit', value: 'edit'},
    {label: 'Delete for all', value: 'deleteAll'},
    {label: 'Delete for me', value: 'deleteMe'}
]

const MessageOptionButton = ({onDelete, onEdit}) => {
    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false);
    const dropdownContentRef = useRef(null);
    const menuRef = useRef()

    const onChange = async (e) => {
        const {value} = e;

        const changeOptions = {
            'deleteAll': () => onDelete(false),
            'deleteMe': () => onDelete(true),
            'edit': onEdit,
        }

        changeOptions[value]();
        setIsComponentVisible(false);
    }

    return (
        <div className="relative mt-auto" ref={ref}>
            <button ref={menuRef} onClick={() => setIsComponentVisible(prev => !prev)}>
                <EllipsisVerticalIcon className="w-6 h-6"/>
            </button>
            <div ref={dropdownContentRef}
                 className={`${
                     isComponentVisible ? '' : 'hidden'
                 } z-20 bg-white fixed w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
                 style={{
                     top: menuRef.current ? menuRef.current.getBoundingClientRect().top + 40 : 0,
                     left: menuRef.current ? menuRef.current.getBoundingClientRect().left : 0
                 }}
            >
                <div className="py-1">
                    {options.map((option, index) => (
                        <button
                            onClick={() => onChange(option)}
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
export default MessageOptionButton;