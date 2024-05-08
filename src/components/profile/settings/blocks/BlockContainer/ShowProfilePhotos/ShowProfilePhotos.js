import { useState } from "react";
import AccountPreferenceService from "../../../../../../services/AccountPreferenceService";

const accountPreference = await AccountPreferenceService.AccountPreference()
const values = await AccountPreferenceService.showProfilePhotosValues()

const ShowProfilePhotos = () => {
  const [selectedOption, setSelectedOption] = useState(accountPreference.data.showProfilePhotos);
  const selectOption = async (val) => {
    setSelectedOption(val);
    const current = accountPreference.data
    const vm = {...current, showProfilePhotos: val}
    await AccountPreferenceService.updateAccountPreference(vm)
  };
  return (
    <div className="w-full bg-white rounded-lg overflow-hidden py-3 px-6 mb-6">
      <div className="font-bold text-xl">Show profile photos</div>
      <div className="my-3">
        Photos of which j4Y members would you like to see
      </div>
      {values.data.map(item => {
        return (
        <div key={'key-' + item} className="mt-10 flex items-center">
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
        )
      })
      }
    </div>
  );
};

export default ShowProfilePhotos;
