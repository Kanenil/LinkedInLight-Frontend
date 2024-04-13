import { EyeIcon, LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";
import { Link, useParams } from "react-router-dom";
import { settingsRoutes } from "../../constants/routes";
import SettingsTable from "../../components/profile/settings/settingsTable/SettingsTable";
import {
  accountParams,
  securitySettings,
  visibilitySettings,
} from "../../components/profile/settings/settingsCategories/settingsCategories";
import { useEffect, useState } from "react";

const Settings = () => {
  const { section, block } = useParams();
  const selectedSection = section || settingsRoutes.sections.params;
  const [currentSettings, setCurrentSettings] = useState(accountParams);

  const getColor = (sectionName) => {
    if (sectionName === selectedSection) {
      return "indigo-500";
    }
    return "black";
  };
  useEffect(() => {
    switch (selectedSection) {
      case settingsRoutes.sections.params:
        setCurrentSettings(accountParams);
        break;
      case settingsRoutes.sections.security:
        setCurrentSettings(securitySettings);
        break;
      case settingsRoutes.sections.visibility:
        setCurrentSettings(visibilitySettings);
        break;
      default:
        setCurrentSettings(accountParams);
        break;
    }
  }, [selectedSection, block]);
  return (
    <div className="bg-[#E7E7E7] w-full py-24 flex justify-center">
      <div className="w-1/4 bg-white h-[900px] rounded-lg overflow-hidden py-8 px-6 inline-block">
        <img
          className="w-[45px] h-[45px] rounded-full  hover:opacity-45 transition duration-300 ease-in-out"
          src="https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg"
          alt="noData"
        ></img>
        <div className="my-3 text-2xl font-semibold">Settings</div>
        <Link
          to={`/j4y${settingsRoutes.settings}${settingsRoutes.sections.params}`}
          className={`text-${getColor(
            settingsRoutes.sections.params
          )} my-7 w-2/3 hover:text-indigo-500 transition duration-300 ease-in-out block`}
        >
          <UserIcon className="inline-block pb-[4px] w-[33px] h-[33px]" />
          <div className="ml-[10px] inline-block">Account parameters</div>
        </Link>
        <Link
          to={`/j4y${settingsRoutes.settings}${settingsRoutes.sections.security}`}
          className={`text-${getColor(
            settingsRoutes.sections.security
          )} my-7 w-2/3 hover:text-indigo-500 transition duration-300 ease-in-out block`}
        >
          <LockClosedIcon className="inline-block pb-[4px] w-[33px] h-[33px]" />
          <div className="ml-[10px] inline-block">Sign-in and Security</div>
        </Link>
        <Link
          to={`/j4y${settingsRoutes.settings}${settingsRoutes.sections.visibility}`}
          className={`text-${getColor(
            settingsRoutes.sections.visibility
          )} my-7 w-1/3 hover:text-indigo-500 transition duration-300 ease-in-out block`}
        >
          <EyeIcon className="inline-block pb-[4px] w-[35px] h-[35px]" />
          <div className="ml-[10px] inline-block">Visibility</div>
        </Link>
      </div>
      <SettingsTable settings={currentSettings} block={block} />
    </div>
  );
};

export default Settings;
