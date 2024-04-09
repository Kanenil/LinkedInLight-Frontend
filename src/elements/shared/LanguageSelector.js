import React, {useEffect, useRef, useState} from "react";
import useComponentVisible from "../../hooks/useComponentVisible";
import {useTranslation} from "react-i18next";
import ChevronDownIcon from "../icons/ChevronDownIcon";

const languages = [
    {label:'Ukrainian',value:'uk'},
    {label:'English',value:'en'}
]

const LanguageSelector = ({fill = 'white', text = 'white', font = 'medium', width = '5', className = ''}) => {
    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false);
    const [isOnBottom, setIsOnBottom] = useState(true);
    const dropdownContentRef = useRef(null);
    const {t, i18n} = useTranslation();

    useEffect(() => {
        const dropdownContentRect = dropdownContentRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        setIsOnBottom(dropdownContentRect.bottom + 10 >= windowHeight);
    }, [isComponentVisible])

    const onChange = async (e) => {
        await i18n.changeLanguage(e.value);
        setIsComponentVisible(false);
    }

    return (
        <div className="relative" ref={ref}>
            <button className={`flex flex-row items-center text-${text} font-${font} cursor-pointer ${className}`} onClick={() => setIsComponentVisible(prev => !prev)}>
                <span className="pr-2.5">{t('footer.languages')}</span>

                <ChevronDownIcon className={`fill-${fill} w-${width}`}/>
            </button>
            <div ref={dropdownContentRef}
                className={`${
                    isComponentVisible ? '' : 'hidden'
                } ${isOnBottom?'top-0':'-top-24'} absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
            >
                <div className="py-1">
                    {languages.map((option, index) => (
                        <button
                            onClick={() => onChange(option)}
                            key={index}
                            className="block w-full flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                            {t(`footer.${option.label}`)}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default LanguageSelector;