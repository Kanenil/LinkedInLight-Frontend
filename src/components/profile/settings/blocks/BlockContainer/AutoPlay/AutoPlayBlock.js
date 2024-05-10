import { useState, useEffect } from "react";
import ToggleSwitch from "../../../../../../elements/other/ToggleSwitch/ToggleSwitch";
import AccountPreferenceService from "../../../../../../services/AccountPreferenceService";
import Loader from '../../../../../shared/Loader'

const AutoPlayBlock = () => {
  const [videoAutoplay, setVideoAutoplay] = useState(null);
  const [prefs, setPrefs] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountPreferenceResponse = await AccountPreferenceService.AccountPreference();
        setPrefs(accountPreferenceResponse.data)
        setVideoAutoplay(accountPreferenceResponse.data.videoAutoplay);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const onChange = async (val) => {
    try {
      const vm = { ...prefs, videoAutoplay: val };
      setPrefs(vm)
      await AccountPreferenceService.updateAccountPreference(vm);
      setVideoAutoplay(val); 
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <>
      <div className="w-full bg-white rounded-lg overflow-hidden py-3 px-6 mb-6">
        <div className="font-bold text-xl">Enable video autoplay</div>
        <div className="flex items-center py-7">
          <div className="inline-block text-gray-400">Video autoplay</div>
          <div className="inline-block ml-auto">
            <ToggleSwitch size={4} onChange={onChange} checked={prefs.videoAutoplay} />
          </div>
        </div>
      </div>
    </>

  );
};

export default AutoPlayBlock;
