import {
  ShieldCheckIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const PasswordChange = () => {
  const [visibility, setVisibility] = useState({
    current: false,
    new: false,
    secure: false,
  });
  const handleClick = (value) => {
    setVisibility((prevVisibility) => ({
      ...prevVisibility,
      [value]: !prevVisibility[value],
    }));
  };
  return (
    <div className="w-full bg-white rounded-lg overflow-hidden py-3 px-6 mb-6">
      <div className="font-bold text-xl">Password change</div>
      <div className="mt-2">
        Create new password with length in not less than 8 symbols
      </div>

      <div className="my-7 text-indigo-700 flex items-center hover:text-indigo-900">
        <ShieldCheckIcon className="w-8 h-8 inline-block" /> How to create
        secure password?
      </div>

      <div className="mt-2">Enter current password*</div>
      <div className="relative w-1/2">
        <input
          type={visibility.current ? "text" : "password"}
          className="mt-2 rounded-2xl w-full"
          placeholder="Current password"
        ></input>
        {visibility.current ? (
          <EyeSlashIcon
            onClick={() => handleClick("current")}
            className="w-7 h-7 text-gray-500 absolute top-4 right-3 hover:text-gray-300"
          />
        ) : (
          <EyeIcon
            onClick={() => handleClick("current")}
            className="w-7 h-7 text-gray-500 absolute top-4 right-3 hover:text-gray-300"
          />
        )}
      </div>

      <div className="mt-2">Enter new password*</div>
      <div className="relative w-1/2">
        <input
          type={visibility.new ? "text" : "password"}
          className="mt-2 rounded-2xl w-full"
          placeholder="New password"
        ></input>
        {visibility.new ? (
          <EyeSlashIcon
            onClick={() => handleClick("new")}
            className="w-7 h-7 text-gray-500 absolute top-4 right-3 hover:text-gray-300"
          />
        ) : (
          <EyeIcon
            onClick={() => handleClick("new")}
            className="w-7 h-7 text-gray-500 absolute top-4 right-3 hover:text-gray-300"
          />
        )}
      </div>
      <div className="mt-2">Confirm new password*</div>
      <div className="relative w-1/2">
        <input
          type={visibility.confirm ? "text" : "password"}
          className="mt-2 rounded-2xl w-full"
          placeholder="Confirm new password"
        ></input>
        {visibility.confirm ? (
          <EyeSlashIcon
            onClick={() => handleClick("confirm")}
            className="w-7 h-7 text-gray-500 absolute top-4 right-3 hover:text-gray-300"
          />
        ) : (
          <EyeIcon
            onClick={() => handleClick("confirm")}
            className="w-7 h-7 text-gray-500 absolute top-4 right-3 hover:text-gray-300"
          />
        )}
      </div>
    </div>
  );
};

export default PasswordChange;
