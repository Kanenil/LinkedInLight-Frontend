import { useState, useEffect } from "react";
import ToggleSwitch from "../../../../../elements/other/ToggleSwitch/ToggleSwitch";
import settingsService from "../../../../../services/settingsService";

const FollowingsVisibility = () => {
  const [currentVisibility, setCurrentVisibility] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentVisibilityResponse = await settingsService.connectionVisibility();
        setCurrentVisibility(currentVisibilityResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const onChange = async (val) => {
    setCurrentVisibility(val);
    await settingsService.updateConnectionVisibility(val);
  };

  return (
    <div className="w-full bg-white rounded-lg overflow-hidden py-3 px-6 mb-6">
      <div className="font-bold text-xl">People able to see followings</div>
      <div className="flex items-center py-7">
        <div className="inline-block text-gray-400">Show followings</div>
        <div className="inline-block ml-auto">
          <ToggleSwitch size={4} onChange={onChange} checked={currentVisibility} />
        </div>
      </div>
    </div>
  );
};

export default FollowingsVisibility;
