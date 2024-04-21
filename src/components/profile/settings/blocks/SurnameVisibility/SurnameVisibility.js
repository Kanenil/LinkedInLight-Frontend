import { useState } from "react";

const SurnameVisibility = () => {
  const [selectedOption, setSelectedOption] = useState("n");
  const selectOption = (val) => {
    setSelectedOption(val);
  };
  return (
    <div className="w-full bg-white rounded-lg overflow-hidden py-3 px-6 mb-6">
      <div className="font-bold text-xl">Surname visibility</div>
      <div className="my-3">Choose how others will see your surname</div>
      <div className="mt-10 flex items-center">
        <input
          onClick={() => selectOption("name")}
          checked={selectedOption === "name"}
          type="radio"
          className={`inline-block ${
            selectedOption === "name" ? "border-gray-400" : "border-gray-300"
          }`}
        />
        <div
          className={`inline-block mx-3 ${
            selectedOption === "name" ? "text-black" : "text-gray-400"
          }`}
        >
          User Name
        </div>
      </div>
      <div className="mt-6 flex items-center">
        <input
          onClick={() => selectOption("n")}
          checked={selectedOption === "n"}
          type="radio"
          className={`inline-block ${
            selectedOption === "n" ? "border-gray-400" : "border-gray-300"
          }`}
        />
        <div
          className={`inline-block mx-3 ${
            selectedOption === "n" ? "text-black" : "text-gray-400"
          }`}
        >
          User N.
        </div>
      </div>
      <div className="mt-10">
        For those who are not your contacts, only the first letter of your last
        name will be visible. For contacts, your full name and last name will be
        visible. Anyone interested in contacting you will be able to find you by
        your first and last name.
      </div>
    </div>
  );
};

export default SurnameVisibility;
