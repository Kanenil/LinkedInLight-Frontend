import ToggleSwitch from "../../../../../elements/other/ToggleSwitch/ToggleSwitch";
import settingsService from "../../../../../services/settingsService";

const current = await settingsService.connectionVisibility()

const FollowingsVisibility = () => {
    const onChange = async (val) => {
        await settingsService.updateConnectionVisibility(val)
      };
  return (
    <div className="w-full bg-white rounded-lg overflow-hidden py-3 px-6 mb-6">
      <div className="font-bold text-xl">People able to see followings</div>
      <div className="flex items-center py-7">
        <div className="inline-block text-gray-400">Show followings</div>
        <div className="inline-block ml-auto">
          <ToggleSwitch size={4} onChange={onChange} checked={current.data} />
        </div>
      </div>
    </div>
  );
};

export default FollowingsVisibility;
