import CalculatorIcon from "../icons/CalculatorIcon";
import ArrowDownIcon from "../icons/ArrowDownIcon";
import React from "react";
import {useHeaderContext} from "../../providers/HeaderProvider";
import classNames from "classnames";

const CompanyButton = () => {
    const {setIsComponentVisible, setModal, modal, isComponentVisible, companyRef} = useHeaderContext();

    const onClick = () => {
        setModal('company');
        setIsComponentVisible(modal !== 'company' || !isComponentVisible);
    }

    return (
        <button ref={companyRef} onClick={onClick}
                className="flex flex-row items-end border-l-2 border-[#24459A73] px-10">
            <CalculatorIcon className={classNames("w-8 h-8 my-auto ", {
                'fill-[#24459A]': modal === 'company' && isComponentVisible,
                'fill-[#2D2A33]': modal !== 'company'
            })}/>
            <ArrowDownIcon className="ml-1 w-3.5 fill-[#24459A]"/>
        </button>
    )
}
export default CompanyButton;