import { useState } from "react";
import settingsService from "../../../../../services/settingsService";


const currentVal = await settingsService.profileViewing()
const values = await settingsService.profileViewingValues()

const ProfileViewing = () => {
  const [selectedOption, setSelectedOption] = useState(currentVal.data);
  const selectOption = async (val) => {
    setSelectedOption(val);
    await settingsService.updateProfileViewing(val)
  };
  return (
    <div className="w-full bg-white rounded-lg overflow-hidden py-3 px-6 mb-6">
      <div className="font-bold text-xl">Profie viewing</div>
      <div className="my-3">People able to view your profile</div>
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

export default ProfileViewing;
