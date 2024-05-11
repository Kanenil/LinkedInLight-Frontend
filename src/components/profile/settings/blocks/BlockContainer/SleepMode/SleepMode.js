import { useState, useEffect } from "react";
import AccountPreferenceService from "../../../../../../services/AccountPreferenceService";
import intoSleepMode from '../../../../../../assets/sleep-mode-image.png'

const SleepMode = () => {
  const [textareaValue, setTextareaValue] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [values, setValues] = useState([]);
  const [isHibernatedAccount, setIsHibernatedAccount] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountPreferenceResponse = await AccountPreferenceService.AccountPreference();
        setIsHibernatedAccount(accountPreferenceResponse.data.isHibernatedAccount)
        const valuesResponse = await AccountPreferenceService.hibernationReasonValues();

        setSelectedOption(valuesResponse.data[0]); // Set default selected option
        setTextareaValue(accountPreferenceResponse.data.hibernationReason || ''); // Set textarea value if it exists
        setValues(valuesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  const selectOption = (val) => {
    setSelectedOption(val);
  };

  // Handle submit button click
  const handleSubmit = async () => {
    try {
      const vm = { reason: selectedOption, feedback: textareaValue };
      await AccountPreferenceService.hibernate(vm);
      window.location.reload()
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg overflow-hidden py-3 px-6 mb-6">
      {isHibernatedAccount ? (
        <div>
          <img src={intoSleepMode} className="w-1/2 mx-auto" />
          <h1 className="font-extrabold text-xl my-3 mx-auto text-center">Your j4Y account is into sleep mode</h1>
          <div className="w-2/3 mx-auto text-lg">Everything is ready. Soon you will receive an email confirming that your account has been switched to sleep mode. If you wish to reactivate your account, log in as usual.</div>
          <div className="w-2/3 mt-5 mx-auto text-lg">To obtain additional information, you can always contact the <span className="text-indigo-600">J4Y Help Center.</span></div>
        </div>
      ) : (
        <>
    <div className="font-bold text-xl">Sleep mode</div>
      <div className="my-3">Everyone needs a break sometimes</div>
      <div className="my-6">
        Putting your account into sleep mode is the best option if you want to
        temporarily hide your profile and activity from J4Y, without closing the
        account.
      </div>
      <div className="my-3 font-bold">
        Tell us why have you decided to put your account into sleep mode
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
      <textarea
        value={textareaValue}
        onChange={handleTextareaChange}
        rows="5"
        className="rounded-xl resize-none w-full mt-7"
        placeholder="Leave review"
      ></textarea>
      <div className="my-7">
        We appreciate your feedback, but please note that we cannot respond to
        comments about your account submitted through this form. If you have any
        questions or inquiries regarding your account that require special
        attention, please contact us{" "}
        <span className="text-indigo-700">here</span>
      </div>
      <div
        onClick={handleSubmit}
        className="mb-8 text-lg w-[150px] rounded-full py-1 font-semibold text-white text-center bg-indigo-800 hover:bg-indigo-900 hover:text-gray-200 cursor-pointer"
      >
        Continue
      </div>
        </>
      )
      }
    </div>
  );
};

export default SleepMode;
