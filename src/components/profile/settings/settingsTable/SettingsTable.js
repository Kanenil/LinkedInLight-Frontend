import { ChevronRightIcon } from "@heroicons/react/24/outline";

const SettingsTable = ({ settings }) => {
  if (!settings || settings?.length <= 0) {
    return <></>;
  }
  const getData = () => {
    return settings.map((item) => {
      return (
        <div className="w-full bg-white rounded-lg overflow-hidden py-3 px-6 mb-6">
          <div className="font-bold text-xl">{item.category}</div>
          {item.items.map((sub, index) => {
            return (
              <div>
                <div className="h-[39px] hover:bg-gray-100 transition duration-300 ease-in-out flex items-center">
                  {sub.name}
                  <div className="ml-auto mr-3 text-sm text-gray-400">
                    {sub?.prescription}
                  </div>
                  <ChevronRightIcon className="h-[17px] w-[17px] inline-block float-right" />
                </div>
                <div
                  className={
                    item.items.length - 1 !== index
                      ? "h-[1px] w-full bg-gray-200"
                      : ""
                  }
                ></div>
              </div>
            );
          })}
        </div>
      );
    });
  };
  return <div className="inline-block mx-10 w-1/2">{getData()}</div>;
};

export default SettingsTable;
