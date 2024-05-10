import { useEffect, useState } from "react";
import { useAlertContext } from '../../../../../../providers/AlertProvider'
import profileService from "../../../../../../services/profileService";

  
  const EmailChange = () => {
    const { success } = useAlertContext()
    const [currentEmail, setCurrentEmail] = useState("");
    const handleCurrentPasswordChange = (event) => {
        setCurrentEmail(event.target.value);
    };
        
    useEffect(() => {
        const fetchData = async () => {
        try {
            const currentValueResponse = await profileService.getProfile();
            setCurrentEmail(currentValueResponse.data.email);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        };

        fetchData();
    }, []);
  
    const onClick = async () => {
      if (currentEmail.length > 0)
      await profileService.changePassword(JSON.stringify({
        email: currentEmail
      }))
      success('Password successfully changed')
    }
  
    return (
      <div className="w-full bg-white rounded-lg overflow-hidden py-3 px-6 mb-6">
        <div className="font-bold text-xl">Email change</div>
        <div className="mt-3 mb-4">
            Enter your new email address
        </div>  
        <div className="relative w-1/2">
          <input
            value={currentEmail}
            onChange={handleCurrentPasswordChange}
            className="rounded-2xl w-full mb-10"
            placeholder="Email..."
          ></input>
        </div>

        <div onClick={onClick}
          className={`mb-8 text-lg w-[200px] rounded-full py-2 font-semibold ${
            currentEmail.length > 0
              ? "text-white text-center bg-indigo-800 hover:bg-indigo-900 hover:text-gray-200"
              : "text-gray-400 text-center bg-indigo-100"
          }`}
        >
         Change Email
        </div>
      </div>
    );
  };
  
  export default EmailChange;
  