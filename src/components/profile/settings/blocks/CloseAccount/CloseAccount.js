import { useState, useEffect } from "react";
import AccountPreferenceService from "../../../../../services/AccountPreferenceService";
import { useAuth } from "../../../../../hooks/useAuth";
import { useAlertContext } from "../../../../../providers/AlertProvider";

const CloseAccount = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [values, setValues] = useState([]);
  const { success } = useAlertContext()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const valuesResponse = await AccountPreferenceService.closingReasonValues();

        setSelectedOption(valuesResponse.data[0]); 
        setValues(valuesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const selectOption = (val) => {
    setSelectedOption(val);
  };
  const { logout } = useAuth()
  const handleSubmit = async () => {
    try {
      const vm = { reason: selectedOption };
      await AccountPreferenceService.close(vm);
      success('Your account was closed')
      logout()
      // Handle continue logic here
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg overflow-hidden py-3 px-6 mb-6">
      <div className="font-bold text-xl">Close account</div>
      <div className="my-3 font-bold">
        Tell us why have you decided to close your account in j4Y
        {"(not required)"}
      </div>
      {values.map((item) => (
        <div key={"key-" + item} className="mt-10 flex items-center">
          <input
            onClick={() => selectOption(item)}
            checked={selectedOption === item}
            type="radio"
            className="inline-block"
          />
          <div
            className={`inline-block mx-3 ${
              selectedOption === item ? "text-black" : "text-gray-400"
            }`}
          >
            {item}
          </div>
        </div>
      ))}
      <div
        onClick={handleSubmit}
        className="my-8 text-lg w-[150px] rounded-full py-1 font-semibold text-white text-center bg-indigo-800 hover:bg-indigo-900 hover:text-gray-200 cursor-pointer"
      >
        Continue
      </div>
    </div>
  );
};

export default CloseAccount;
