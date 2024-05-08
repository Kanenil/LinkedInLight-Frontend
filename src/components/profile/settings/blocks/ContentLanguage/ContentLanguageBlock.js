import AccountPreferenceService from "../../../../../services/AccountPreferenceService";
import additionalProfileService from "../../../../../services/additionalProfileService";


const accountPreference = await AccountPreferenceService.AccountPreference()
const allLanguages = await additionalProfileService.getAllLanguages()
const ContentLanguageBlock = () => {
  const onChange = async (e) => {
    const current = accountPreference.data
    const vm = {
      ...current,
      contentLanguage: e.target.value
    }
    await AccountPreferenceService.updateAccountPreference(vm)
  }
  return (
    <div className="w-full bg-white rounded-lg overflow-hidden py-3 px-6 mb-6">
      <div className="font-bold text-xl">Content Language</div>
      <div className="mt-2">Choose content language which you use in j4Y</div>
      <select onChange={onChange} className="mt-5 w-1/2 rounded-2xl">
        {allLanguages.data.map((language) => {
          return <option value={language.name} key={language.id} selected={accountPreference.data.contentLanguage === language.name}>{language.name}</option>
        })}
      </select>
      <div className="mt-6">
        Notify us which content language which you use in j4Y. You can change it
        anytime. <span className="text-indigo-500">Learn more</span>
      </div>
    </div>
  );
};

export default ContentLanguageBlock;
