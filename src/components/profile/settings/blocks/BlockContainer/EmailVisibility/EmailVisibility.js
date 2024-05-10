import { useState, useEffect } from "react";
import settingsService from "../../../../../../services/settingsService";

const EmailVisibility = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [values, setValues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentValResponse = await settingsService.emailVisibility();
        setSelectedOption(currentValResponse.data);

        const valuesResponse = await settingsService.emailVisibilityValues();
        setValues(valuesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const selectOption = async (val) => {
    setSelectedOption(val);
    await settingsService.updateEmailVisibility(val);
  };

  return (
    <div className="w-full bg-white rounded-lg overflow-hidden py-3 px-6 mb-6">
      <div className="font-bold text-xl">Email visibility</div>
      <div className="my-3">People able to see your email</div>
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
    </div>
  );
};

export default EmailVisibility;
