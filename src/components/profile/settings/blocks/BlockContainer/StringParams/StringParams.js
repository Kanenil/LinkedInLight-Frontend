import { useState, useEffect } from "react";
import AccountPreferenceService from "../../../../../../services/AccountPreferenceService";

const StringParams = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [values, setValues] = useState([]);
  const [prefs, setPrefs] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountPrefResponse = await AccountPreferenceService.AccountPreference();
        setSelectedOption(accountPrefResponse.data.feedPreferences);
        setPrefs(accountPrefResponse.data);

        const valuesResponse = await AccountPreferenceService.feedPreferencesValues();
        setValues(valuesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const selectOption = async (val) => {
    setSelectedOption(val);
    const vm = { ...prefs, feedPreferences: val };
    await AccountPreferenceService.updateAccountPreference(vm);
  };

  return (
    <div className="w-full bg-white rounded-lg overflow-hidden py-3 px-6 mb-6">
      <div className="font-bold text-xl">String params</div>
      <div className="my-3">Choose mode of viewing string</div>
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