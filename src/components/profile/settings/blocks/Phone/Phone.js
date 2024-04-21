const PhoneBlock = () => {
  return (
    <div className="w-full bg-white rounded-lg overflow-hidden py-3 px-6 mb-6">
      <div className="font-bold text-xl">Phone</div>
      <div className="mt-2 mb-5">You haven't add any phone number yet</div>
      <div className="mb-5">
        Willing to add new phone number right now? This method is usefull when
        you need t change password
      </div>
      <div className="mb-5">
        The phone number helps us protect the account, providing an additional
        level of confirmation. It also helps others who already have your phone
        number to find you and get in touch with you. You can decide how you
        want to use your phone number at any time.{" "}
        <span className="text-indigo-600">Learn more.</span>
      </div>
      <div className="mt-6 text-lg w-[200px] rounded-full py-2 font-semibold text-white text-center bg-indigo-800 hover:bg-indigo-900 hover:text-gray-200">
        Add phone number
      </div>
    </div>
  );
};

export default PhoneBlock;
