import React, { useState } from "react";

const ToggleSwitch = ({
  checked = true,
  classes,
  onChange,
  textOnCheck = { on: "On", off: "Off" },
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleSwitch = () => {
    if (onChange) {
      onChange();
    }
    setIsChecked((prevState) => !prevState);
  };

  return (
    <div className={classes || "flex items-center"}>
      <div className="mr-2">{isChecked ? textOnCheck.on : textOnCheck.off}</div>
      <input
        type="checkbox"
        id="toggle"
        className="sr-only"
        checked={isChecked}
        onChange={toggleSwitch}
      />
      <label
        htmlFor="toggle"
        className={`relative w-[42px] h-6 rounded-full cursor-pointer pt-[1.9px] ${
          isChecked ? "bg-indigo-800" : "bg-gray-400"
        }`}
      >
        <div
          className={`absolute w-5 h-5 rounded-full bg-white shadow-md transform duration-300 ease-in-out ${
            isChecked ? "translate-x-full" : "left-[2px]"
          }`}
        ></div>
      </label>
    </div>
  );
};

export default ToggleSwitch;
