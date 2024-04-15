import classNames from "classnames";
import Show from "../shared/Show";
import {CheckIcon} from "@heroicons/react/24/outline";
import {PlusIcon, XMarkIcon} from "@heroicons/react/24/solid";

const ButtonVariant1 = ({children, className, ...props}) => {
    return (
        <button
            className={`${className} bg-[#24459A] rounded-full py-1.5 px-6 font-jost text-white text-sm hover:bg-[#112861] transition duration-500 ease-in-out`}
            {...props}
        >
            {children}
        </button>
    )
}

const ButtonVariant2 = ({children, className, active = false, ...props}) => {
    return (
        <button
            className={classNames("rounded-full flex flex-row items-center gap-1 py-1.5 text-sm px-4 font-jost transition duration-500 ease-in-out", {
                'border-[1.5px] bg-[#3967DB] text-white hover:border-[#24459A]': active,
                'border-[1px] border-[#7D88A4] text-[#7D88A4] hover:border-[#24459A] hover:border-[1.5px] hover:text-[#556DA9]': !active
            })}
            {...props}
        >
            {children}

            <Show>
                <Show.When isTrue={active}>
                    <CheckIcon className="w-4 h-4 stroke-[3px]"/>
                </Show.When>

                <Show.Else>
                    <PlusIcon className="w-4 h-4"/>
                </Show.Else>
            </Show>
        </button>
    )
}

const ButtonVariant3 = ({children, className, ...props}) => {
    return (
        <button
            className="rounded-full flex flex-row items-center gap-1 py-1.5 text-sm px-4 font-jost border-[1.5px] bg-[#3967DB] text-white hover:border-[#24459A] transition duration-500 ease-in-out"
            {...props}
        >
            {children}

            <XMarkIcon className="w-4 h-4 stroke-[3px]"/>
        </button>
    )
}

const ButtonVariant4 = ({children, className = '', ...props}) => {
    return (
        <button
            className={`${className} text-[#24459A] py-1.5 px-6 font-jost font-bold text-xl hover:text-[#112861] transition duration-500 ease-in-out`}
            {...props}
        >
            {children}
        </button>
    )
}

export {ButtonVariant1, ButtonVariant2, ButtonVariant3, ButtonVariant4}