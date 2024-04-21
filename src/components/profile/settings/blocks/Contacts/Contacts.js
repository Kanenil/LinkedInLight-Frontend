import ToggleSwitch from "../../../../../elements/other/ToggleSwitch/ToggleSwitch";

const Contacts = () => {
  return (
    <div className="w-full bg-white rounded-lg overflow-hidden py-3 px-6 mb-6">
      <div className="font-bold text-xl">Contacts visibility</div>
      <div className="my-4">Allow your contacts to see contacts list</div>
      <div className="flex items-center py-7">
        <div className="inline-block text-gray-400">Contacts visibility</div>
        <div className="inline-block ml-auto">
          <ToggleSwitch size={4} />
        </div>
      </div>
      <div className="my-4">
        If you disable this setting, only you will be able to see the contact
        list. Your contacts will still be able to see any mutual contacts or
        contacts who have approved you.{" "}
        <span className="text-indigo-600">Learn more</span>
      </div>
    </div>
  );
};

export default Contacts;
