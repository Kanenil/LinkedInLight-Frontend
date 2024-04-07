const LanguageBlock = () => {
  return (
    <div className="w-full bg-white rounded-lg overflow-hidden py-3 px-6 mb-6">
      <div className="font-bold text-xl">Language</div>
      <div className="mt-2">Choose language which you use in j4Y</div>
      <select className="mt-5 w-1/2 rounded-2xl">
        <option>English{" (English)"}</option>
        <option>Українська{" (Ukranian)"}</option>
      </select>
      <div className="mt-6">
        Notify us which language which you use in j4Y. You can change it
        anytime. <span className="text-indigo-500">Learn more</span>
      </div>
    </div>
  );
};

export default LanguageBlock;
