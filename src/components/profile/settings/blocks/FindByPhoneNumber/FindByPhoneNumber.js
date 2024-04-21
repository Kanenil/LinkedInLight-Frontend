import { useState } from "react";

const FindByPhoneNumber = () => {
  const [selectedOption, setSelectedOption] = useState("anyone");
  const selectOption = (val) => {
    setSelectedOption(val);
  };
  return (
    <div className="w-full bg-white rounded-lg overflow-hidden py-3 px-6 mb-6">
      <div className="font-bold text-xl">Find by phone number</div>
      <div className="my-3">
        Who can find you or contact you if they know your email address?
      </div>
      <div className="mt-10 flex items-center">
        <input
          onClick={() => selectOption("1st")}
          checked={selectedOption === "1st"}
          type="radio"
          className={`inline-block ${
            selectedOption === "1st" ? "border-gray-400" : "border-gray-300"
          }`}
        />
        <div
          className={`inline-block mx-3 ${
            selectedOption === "1st" ? "text-black" : "text-gray-400"
          }`}
        >
          1st level contacts
        </div>
      </div>
      <div className="mt-6 flex items-center">
        <input
          onClick={() => selectOption("2nd")}
          checked={selectedOption === "2nd"}
          type="radio"
          className={`inline-block ${
            selectedOption === "2nd" ? "border-gray-400" : "border-gray-300"
          }`}
        />
        <div
          className={`inline-block mx-3 ${
            selectedOption === "2nd" ? "text-black" : "text-gray-400"
          }`}
        >
          1st and 2nd level contacts
        </div>
      </div>
      <div className="mt-6 flex items-center">
        <input
          onClick={() => selectOption("anyone")}
          checked={selectedOption === "anyone"}
          type="radio"
          className={`inline-block ${
            selectedOption === "anyone" ? "border-gray-400" : "border-gray-300"
          }`}
        />
        <div
          className={`inline-block mx-3 ${
            selectedOption === "anyone" ? "text-black" : "text-gray-400"
          }`}
        >
          Anyone
        </div>
      </div>
      <div className="mt-10">
        Your first-level contacts can always identify you since you are already
        connected with them.{" "}
        <span className="text-indigo-600">Learn more.</span>
      </div>
    </div>
  );
};

export default FindByPhoneNumber;
