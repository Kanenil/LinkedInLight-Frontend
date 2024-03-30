import classNames from "classnames";
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper";

const FormSelector = ({handleChange, value, disabled = false, touched, error, title, name, options, margin, defaultOption = "", ...props}) => {
    return (
        <>
            <div className={margin}>
                <select
                    name={name}
                    value={value}
                    onChange={handleChange}
                    disabled={disabled}
                    className={classNames("w-full rounded-[4px] border-[0.5px] border-[#556DA9] py-[5px] px-2.5 text-[#7D7D7D] text-sm",
                        {
                            "focus:border-red-400 focus:ring-red-300 border-[#9E0F20]": touched && error,
                            "focus:border-green-400 focus:ring-green-300 border-green-400": touched && !error
                        }
                    )}
                    {...props}
                >
                    <option value="" hidden>{title}</option>
                    <ConditionalWrapper condition={defaultOption.length > 0}>
                        <option value="dis" disabled>{defaultOption}</option>
                    </ConditionalWrapper>
                    {options.map((val, index) => (
                        <option key={`${name}-${val}-${index}`} value={val}>{val}</option>
                    ))}
                </select>
                {/*{touched && error && (*/}
                {/*    <p className="mt-3 text-xs text-red-400">{error}</p>*/}
                {/*)}*/}
            </div>
        </>
    )
}
export default FormSelector;