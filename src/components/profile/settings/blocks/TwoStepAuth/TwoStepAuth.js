import { useState, useEffect } from "react";
import { ProfileSecurityService } from "../../../../../services/ProfileSecurityService";
import ToggleSwitch from "../../../../../elements/other/ToggleSwitch/ToggleSwitch";

const TwoStepAuth = () => {
  const [videoAutoplay, setVideoAutoplay] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountPreferenceResponse = await ProfileSecurityService.AccountPreference();
        setVideoAutoplay(accountPreferenceResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const onChange = async (val) => {
    try {
      await ProfileSecurityService.setTwoStepVerification(val);
      setVideoAutoplay(val); 
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <>
      <div className="w-full bg-white rounded-lg overflow-hidden py-3 px-6 mb-6">
        <div className="font-bold text-xl">Two step authentication</div>
        <div className="flex items-center py-7">
        <div className="inline-block text-gray-400">Two step authentication</div>
          <div className="inline-block ml-auto">
            <ToggleSwitch size={4} onChange={onChange} checked={videoAutoplay} />
          </div>
        </div>
      </div>
    </>

  );
};

export default TwoStepAuth;
