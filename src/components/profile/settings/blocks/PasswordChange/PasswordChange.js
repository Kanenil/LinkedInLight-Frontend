import {
  ShieldCheckIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

const PasswordChange = () => {
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
          type="password"
          className="mt-2 rounded-2xl w-full"
          placeholder="Current password"
        ></input>
        {true ? (
          <EyeSlashIcon className="w-7 h-7 text-gray-500 absolute top-4 right-3 hover:text-gray-300" />
        ) : (
          <EyeIcon className="w-7 h-7 text-gray-500 absolute top-4 right-3 hover:text-gray-300" />
        )}
      </div>

      <div className="mt-2">Enter new password*</div>
      <div className="relative w-1/2">
        <input
          type="password"
          className="mt-2 rounded-2xl w-full"
          placeholder="New password"
        ></input>
        <EyeIcon className="w-7 h-7 text-gray-500 absolute top-4 right-3 hover:text-gray-300" />
      </div>
      <div className="mt-2">Confirm new password*</div>
      <div className="relative w-1/2">
        <input
          type="password"
          className="mt-2 rounded-2xl w-full"
          placeholder="Confirm new password"
        ></input>
        <EyeIcon className="w-7 h-7 text-gray-500 absolute top-4 right-3 hover:text-gray-300" />
      </div>
    </div>
  );
};

export default PasswordChange;
