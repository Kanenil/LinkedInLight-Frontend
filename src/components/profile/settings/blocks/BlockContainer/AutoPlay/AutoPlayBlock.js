import ToggleSwitch from "../../../../../../elements/other/ToggleSwitch/ToggleSwitch";
import AccountPreferenceService from "../../../../../../services/AccountPreferenceService";

const accountPreference = await AccountPreferenceService.AccountPreference()
const onChange = async (val) => {
    const current = accountPreference.data
    const vm = {...current, videoAutoplay: val}
    await AccountPreferenceService.updateAccountPreference(vm)
  };
const AutoPlayBlock = () => {
  return (
    <div className="w-full bg-white rounded-lg overflow-hidden py-3 px-6 mb-6">
      <div className="font-bold text-xl">Enable video autoplay</div>
      <div className="flex items-center py-7">
        <div className="inline-block text-gray-400">Video autoplay</div>
        <div className="inline-block ml-auto">
          <ToggleSwitch size={4} onChange={onChange} checked={accountPreference.data.videoAutoplay} />
        </div>
      </div>
    </div>
  );
};

export default AutoPlayBlock;
