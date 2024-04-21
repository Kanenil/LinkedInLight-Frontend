import {twMerge} from "tailwind-merge";

const ToggleInput = ({name, onChange, value, className}) => {
    return (
        <label htmlFor={name} className={twMerge("inline-flex items-center cursor-pointer", className)}>
            <input name={name} id={name} type="checkbox" checked={value} value={name} onChange={onChange} className="sr-only peer"/>
            <span className="ms-3 text-sm font-light text-[#A7A7A7] mr-2">{value?'On':'Off'}</span>
            <div className="relative w-11 h-6 bg-[#E7E7E7] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#24459A] dark:peer-focus:ring-[#24459A] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#24459A]"></div>
        </label>
    )
}
export default ToggleInput;