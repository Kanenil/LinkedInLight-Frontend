import { useState, useEffect } from "react";
import AccountPreferenceService from "../../../../../services/AccountPreferenceService";
import additionalProfileService from "../../../../../services/additionalProfileService";

const ContentLanguageBlock = () => {
  const [accountPreference, setAccountPreference] = useState(null);
  const [allLanguages, setAllLanguages] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountPreferenceResponse = await AccountPreferenceService.AccountPreference();
        const allLanguagesResponse = await additionalProfileService.getAllLanguages();
        
        setAccountPreference(accountPreferenceResponse.data);
        setAllLanguages(allLanguagesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, []);
  
  const onChange = async (e) => {
    try {
      const current = { ...accountPreference };
      const vm = {
        ...current,
        contentLanguage: e.target.value
      };
      await AccountPreferenceService.updateAccountPreference(vm);
      setAccountPreference(vm); // Update local state after successful update
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg overflow-hidden py-3 px-6 mb-6">
      <div className="font-bold text-xl">Content Language</div>
      <div className="mt-2">Choose content language which you use in j4Y</div>
      <select onChange={onChange} className="mt-5 w-1/2 rounded-2xl" value={accountPreference?.contentLanguage || ""}>
        {allLanguages.map((language) => (
          <option value={language.name} key={language.id}>{language.name}</option>
        ))}
      </select>
      <div className="mt-6">
        Notify us which content language which you use in j4Y. You can change it
        anytime. <span className="text-indigo-500">Learn more</span>
      </div>
    </div>
  );
};

export default ContentLanguageBlock;
