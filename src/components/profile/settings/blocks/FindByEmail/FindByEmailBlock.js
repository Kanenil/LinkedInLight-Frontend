import { useState, useEffect } from "react";
import settingsService from "../../../../../services/settingsService";

const FindByEmailBlock = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [values, setValues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentValueResponse = await settingsService.discoverByEmail();
        setSelectedOption(currentValueResponse.data);

        const valuesResponse = await settingsService.discoverByEmailValues();
        setValues(valuesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const selectOption = async (val) => {
    setSelectedOption(val);
    await settingsService.updateDiscoverByEmail(val);
  };

  return (
    <div className="w-full bg-white rounded-lg overflow-hidden py-3 px-6 mb-6">
      <div className="font-bold text-xl">Find by email</div>
      <div className="my-3">
        Who can find you or contact you if they know your email address?
      </div>
      {values.map((item) => (
        <div key={"key-" + item} className="mt-10 flex items-center">
          <input
            onClick={() => selectOption(item)}
            checked={selectedOption === item}
            type="radio"
            className="inline-block"
          />
          <div
            className={`inline-block mx-3 ${
              selectedOption === item ? "text-black" : "text-gray-400"
            }`}
          >
            {item}
          </div>
        </div>
      ))}
      <div className="mt-10">
        Your first-level contacts can always identify you since you are already
        connected with them.{" "}
        <span className="text-indigo-600">Learn more.</span>
      </div>
    </div>
  );
};

export default FindByEmailBlock;
