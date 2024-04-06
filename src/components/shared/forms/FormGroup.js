import classNames from "classnames";
import EyeIcon from "../../../elements/icons/EyeIcon";
import {useState} from "react";
import {useTranslation} from "react-i18next";

const FormGroup = ({handleChange, value, touched, error, title, name, type, margin, ...props}) => {
    const [showPassword, setShowPassword] = useState(false);
    const {t} = useTranslation();

    return (
        <>
            <div className={`${margin} relative`}>
                <input
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className={classNames("w-full rounded-xl border-[1px] border-[#B4BFDD] px-[20px] py-[10px] text-[#7D7D7D] text-xs",
                        {
                            "focus:border-red-400 focus:ring-red-300 border-red-400": touched && error,
                            "focus:border-green-400 focus:ring-green-300 border-green-400": touched && !error
                        }
                    )}
                    placeholder={title}
                    type={showPassword? "text": type}
                    {...props}
                />
                {type === "password" && (
                    <button type="button"
                            onClick={() => setShowPassword((val) => !val)}
                            className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-600">
                        <EyeIcon className="w-5 h-5"/>
                    </button>
                )}
            </div>
            {touched && error && (
                <p className="mt-3 text-xs text-red-400">{t(error)}</p>
            )}
        </>
    )
}
export default FormGroup;