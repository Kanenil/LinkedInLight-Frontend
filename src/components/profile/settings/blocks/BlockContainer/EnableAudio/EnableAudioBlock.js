import ToggleSwitch from "../../../../../../elements/other/ToggleSwitch/ToggleSwitch";
import AccountPreferenceService from "../../../../../../services/AccountPreferenceService";

const accountPreference = await AccountPreferenceService.AccountPreference()
const onChange = async (val) => {
    const current = accountPreference.data
    const vm = {...current, soundEffects: val}
    await AccountPreferenceService.updateAccountPreference(vm)
  };
const EnableAudioBlock = () => {
  return (
    <div className="w-full bg-white rounded-lg overflow-hidden py-3 px-6 mb-6">
      <div className="font-bold text-xl">Enable audio effects</div>
      <div className="flex items-center py-7">
        <div className="inline-block text-gray-400">Audio effects</div>
        <div className="inline-block ml-auto">
          <ToggleSwitch size={4} onChange={onChange} checked={accountPreference.data.soundEffects} />
        </div>
      </div>
    </div>
  );
};

export default EnableAudioBlock;
