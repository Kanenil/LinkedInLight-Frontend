import { useState, useEffect } from "react";
import AccountPreferenceService from "../../../../../../services/AccountPreferenceService";

const ShowProfilePhotos = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [values, setValues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountPreferenceResponse = await AccountPreferenceService.AccountPreference();
        setSelectedOption(accountPreferenceResponse.data.showProfilePhotos);

        const valuesResponse = await AccountPreferenceService.showProfilePhotosValues();
        setValues(valuesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const selectOption = async (val) => {
    setSelectedOption(val);
    try {
      const current = { ...selectedOption }; 
      const vm = { ...current, showProfilePhotos: val };
      await AccountPreferenceService.updateAccountPreference(vm);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg overflow-hidden py-3 px-6 mb-6">
      <div className="font-bold text-xl">Show profile photos</div>
      <div className="my-3">Photos of which j4Y members would you like to see</div>
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

export default ShowProfilePhotos;
