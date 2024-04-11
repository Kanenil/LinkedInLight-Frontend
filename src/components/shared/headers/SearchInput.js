import {useTranslation} from "react-i18next";
import {useDebounceCallback} from "usehooks-ts";
import React from "react";
import LoopIcon from "../../../elements/icons/LoopIcon";
import {useHeaderContext} from "../../../providers/HeaderProvider";

const SearchInput = () => {
    const {ref, onFocus, setIsComponentVisible, setSearch, setModal} = useHeaderContext();
    const {t} = useTranslation();

    const debounced = useDebounceCallback((val) => {
        setIsComponentVisible(true);
        setModal('search');
        setSearch(val);
    }, 200);

    return (
        <React.Fragment>
            <div className="ml-10 my-auto relative">
                <input type="text"
                       placeholder={t('header.search')}
                       className="border-[1px] border-[#2D2A33] rounded-xl w-[300px] pl-10 text-xs"
                       ref={ref}
                       onChange={e => debounced(e.target.value)}
                       onFocus={onFocus}
                />

                <LoopIcon className="absolute left-4 top-2.5 fill-[#2D2A33] h-3"/>
            </div>
        </React.Fragment>
    )
}
export default SearchInput;