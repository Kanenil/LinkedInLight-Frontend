import { useState } from "react";

const ShowProfilePhotos = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const selectOption = (val) => {
    setSelectedOption(val);
  };
  return (
    <div className="w-full bg-white rounded-lg overflow-hidden py-3 px-6 mb-6">
      <div className="font-bold text-xl">Show profile photos</div>
      <div className="my-3">
        Photos of which j4Y members would you like to see
      </div>
      <div className="mt-10 flex items-center">
        <input
          onClick={() => selectOption("nobody")}
          checked={selectedOption === "nobody"}
          type="radio"
          className="inline-block"
        />
        <div
          className={`inline-block mx-3 ${
            selectedOption === "nobody" ? "text-black" : "text-gray-400"
          }`}
        >
          Nobody
        </div>
      </div>
      <div className="mt-6 flex items-center">
        <input
          onClick={() => selectOption("contacts")}
          checked={selectedOption === "contacts"}
          type="radio"
          className="inline-block"
        />
        <div
          className={`inline-block mx-3 ${
            selectedOption === "contacts" ? "text-black" : "text-gray-400"
          }`}
        >
          Your contacts
        </div>
      </div>
      <div className="mt-6 flex items-center">
        <input
          onClick={() => selectOption("network")}
          checked={selectedOption === "network"}
          type="radio"
          className="inline-block"
        />
        <div
          className={`inline-block mx-3 ${
            selectedOption === "network" ? "text-black" : "text-gray-400"
          }`}
        >
          Network
        </div>
      </div>
      <div className="mt-6 flex items-center">
        <input
          onClick={() => selectOption("all")}
          checked={selectedOption === "all"}
          type="radio"
          className="inline-block"
        />
        <div
          className={`inline-block mx-3 ${
            selectedOption === "all" ? "text-black" : "text-gray-400"
          }`}
        >
          All j4Y members
        </div>
      </div>
    </div>
  );
};

export default ShowProfilePhotos;
