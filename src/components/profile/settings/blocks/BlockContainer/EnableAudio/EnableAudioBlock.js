import { useState, useEffect } from "react";
import ToggleSwitch from "../../../../../../elements/other/ToggleSwitch/ToggleSwitch";
import AccountPreferenceService from "../../../../../../services/AccountPreferenceService";

const EnableAudioBlock = () => {
  const [soundEffects, setSoundEffects] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountPreferenceResponse = await AccountPreferenceService.AccountPreference();
        setSoundEffects(accountPreferenceResponse.data.soundEffects);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const onChange = async (val) => {
    try {
      const current = { ...soundEffects };
      const vm = { ...current, soundEffects: val };
      await AccountPreferenceService.updateAccountPreference(vm);
      setSoundEffects(val); 
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg overflow-hidden py-3 px-6 mb-6">
      <div className="font-bold text-xl">Enable audio effects</div>
      <div className="flex items-center py-7">
        <div className="inline-block text-gray-400">Audio effects</div>
        <div className="inline-block ml-auto">
          <ToggleSwitch size={4} onChange={onChange} checked={soundEffects} />
        </div>
      </div>
    </div>
  );
};

export default EnableAudioBlock;
