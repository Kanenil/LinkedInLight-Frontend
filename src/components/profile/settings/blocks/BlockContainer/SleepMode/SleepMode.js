import { useState } from "react";

const SleepMode = () => {
  const [selectedOption, setSelectedOption] = useState("other");
  const selectOption = (val) => {
    setSelectedOption(val);
  };
  return (
    <div className="w-full bg-white rounded-lg overflow-hidden py-3 px-6 mb-6">
      <div className="font-bold text-xl">Sleep mode</div>
      <div className="my-3">Everyone needs a break sometimes</div>
      <div className="my-6">
        Putting your account into sleep mode is the best option if you want to
        temporarily hide your profile and activity from J4Y, without closing the
        account.
      </div>
      <div className="my-3 font-bold">
        Tell us why have you decided to put your account into sleep mode
        {"(not required)"}
      </div>
      <div className="mt-10 flex items-center">
        <input
          onClick={() => selectOption("break")}
          checked={selectedOption === "break"}
          type="radio"
          className={`inline-block ${
            selectedOption === "break" ? "border-gray-400" : "border-gray-300"
          }`}
        />
        <div
          className={`inline-block mx-3 ${
            selectedOption === "break" ? "text-black" : "text-gray-400"
          }`}
        >
          I need a break
        </div>
      </div>
      <div className="mt-6 flex items-center">
        <input
          onClick={() => selectOption("notifications")}
          checked={selectedOption === "notifications"}
          type="radio"
          className={`inline-block ${
            selectedOption === "notifications"
              ? "border-gray-400"
              : "border-gray-300"
          }`}
        />
        <div
          className={`inline-block mx-3 ${
            selectedOption === "notifications" ? "text-black" : "text-gray-400"
          }`}
        >
          I get too much email notifications
        </div>
      </div>
      <div className="mt-6 flex items-center">
        <input
          onClick={() => selectOption("privacy")}
          checked={selectedOption === "privacy"}
          type="radio"
          className={`inline-block ${
            selectedOption === "privacy" ? "border-gray-400" : "border-gray-300"
          }`}
        />
        <div
          className={`inline-block mx-3 ${
            selectedOption === "privacy" ? "text-black" : "text-gray-400"
          }`}
        >
          I have privacy issues
        </div>
      </div>
      <div className="mt-6 flex items-center">
        <input
          onClick={() => selectOption("security")}
          checked={selectedOption === "security"}
          type="radio"
          className={`inline-block ${
            selectedOption === "security"
              ? "border-gray-400"
              : "border-gray-300"
          }`}
        />
        <div
          className={`inline-block mx-3 ${
            selectedOption === "security" ? "text-black" : "text-gray-400"
          }`}
        >
          I have security issues
        </div>
      </div>
      <div className="mt-6 flex items-center">
        <input
          onClick={() => selectOption("other")}
          checked={selectedOption === "other"}
          type="radio"
          className={`inline-block ${
            selectedOption === "other" ? "border-gray-400" : "border-gray-300"
          }`}
        />
        <div
          className={`inline-block mx-3 ${
            selectedOption === "other" ? "text-black" : "text-gray-400"
          }`}
        >
          Other
        </div>
      </div>
      <textarea
        rows="5"
        className="rounded-xl resize-none w-full mt-7"
        placeholder="Leave review"
      ></textarea>
      <div className="my-7">
        We appreciate your feedback, but please note that we cannot respond to
        comments about your account submitted through this form. If you have any
        questions or inquiries regarding your account that require special
        attention, please contact us{" "}
        <span className="text-indigo-700">here</span>
      </div>
      <div className="mb-8 text-lg w-[150px] rounded-full py-1 font-semibold text-white text-center bg-indigo-800 hover:bg-indigo-900 hover:text-gray-200">
        Continue
      </div>
    </div>
  );
};

export default SleepMode;
