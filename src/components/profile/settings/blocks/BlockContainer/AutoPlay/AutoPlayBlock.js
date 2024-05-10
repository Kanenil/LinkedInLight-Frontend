import { useState, useEffect } from "react";
import ToggleSwitch from "../../../../../../elements/other/ToggleSwitch/ToggleSwitch";
import AccountPreferenceService from "../../../../../../services/AccountPreferenceService";

const AutoPlayBlock = () => {
  const [videoAutoplay, setVideoAutoplay] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountPreferenceResponse = await AccountPreferenceService.AccountPreference();
        setVideoAutoplay(accountPreferenceResponse.data.videoAutoplay);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const onChange = async (val) => {
    try {
      const current = { ...videoAutoplay }; // Be cautious here, make sure to use videoAutoplay instead of accountPreference.data
      const vm = { ...current, videoAutoplay: val };
      await AccountPreferenceService.updateAccountPreference(vm);
      setVideoAutoplay(val); // Update local state after successful update
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg overflow-hidden py-3 px-6 mb-6">
      <div className="font-bold text-xl">Enable video autoplay</div>
      <div className="flex items-center py-7">
        <div className="inline-block text-gray-400">Video autoplay</div>
        <div className="inline-block ml-auto">
          <ToggleSwitch size={4} onChange={onChange} checked={videoAutoplay} />
        </div>
      </div>
    </div>
  );
};

export default AutoPlayBlock;
