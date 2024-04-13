import classNames from "classnames";
import React, {memo} from "react";

const ModalRadioInput = memo(({title, name, onChange, value, condition}) => {
    const id = crypto.randomUUID();

    return (
        <div className="flex flex-row gap-2">
            <input
                id={id}
                name={name}
                checked={value.toString() === condition.toString()}
                value={condition}
                type="radio"
                onChange={onChange}
                className="border-[#7D7D7D] hover:border-[#2D2A33] checked:border-[1px] checked:border-[#2D2A33] focus:ring-transparent checked:focus:bg-[#24459A] checked:bg-[#24459A] checked:hover:bg-[#24459A]"
                style={{backgroundImage: "none"}}
            />

            <label htmlFor={id} className="font-jost text-[#2D2A33]">{title}</label>
        </div>
    )
})
export default ModalRadioInput;