import classNames from "classnames";

const FormSelector = ({handleChange, value, touched, error, title, name, options, margin, ...props}) => {
    return (
        <>
            <div className={margin}>
                <select
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className={classNames("w-full rounded-xl border-[1px] border-[#B4BFDD] px-[20px] py-[10px] text-[#7D7D7D] text-xs",
                        // {
                        //     "focus:border-red-400 focus:ring-red-300 border-red-400": touched && error,
                        //     "focus:border-green-400 focus:ring-green-300 border-green-400": touched && !error
                        // }
                    )}
                    {...props}
                >
                    <option value="" hidden>{title}</option>
                    {options.map((val) => (
                        <option key={val} value={val}>{val}</option>
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