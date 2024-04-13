import { useState } from "react";

const StringParams = () => {
  const [selectedOption, setSelectedOption] = useState("recent");
  const selectOption = (val) => {
    setSelectedOption(val);
  };
  return (
    <div className="w-full bg-white rounded-lg overflow-hidden py-3 px-6 mb-6">
      <div className="font-bold text-xl">String params</div>
      <div className="my-3">Choose mode of viewing string</div>
      <div className="mt-10 flex items-center">
        <input
          onClick={() => selectOption("relevant")}
          checked={selectedOption === "relevant"}
          type="radio"
          className={`inline-block ${
            selectedOption === "recent" ? "border-gray-400" : "border-gray-300"
          }`}
        />
        <div
          className={`inline-block mx-3 ${
            selectedOption === "relevant" ? "text-black" : "text-gray-400"
          }`}
        >
          Most relevant posts {`(recommended)`}
        </div>
      </div>
      <div className="mt-6 flex items-center">
        <input
          onClick={() => selectOption("recent")}
          checked={selectedOption === "recent"}
          type="radio"
          className={`inline-block ${
            selectedOption === "recent" ? "border-gray-400" : "border-gray-300"
          }`}
        />
        <div
          className={`inline-block mx-3 ${
            selectedOption === "recent" ? "text-black" : "text-gray-400"
          }`}
        >
          Recent posts
        </div>
      </div>
      <div className="mt-10">
        The first option means that J4Y will use data from your profile and
        activity to rank the content in your feed based on your interests. The
        second option means that J4Y will not use data from your profile and
        activity but will instead display content in reverse chronological
        order. This will become the standard viewing mode for your feed. You can
        change your feed settings at any time.{" "}
        <span className="text-indigo-700">Learn more</span>
      </div>
    </div>
  );
};

export default StringParams;
