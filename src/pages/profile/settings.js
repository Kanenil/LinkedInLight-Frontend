import { EyeIcon, LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";
import { Link, useParams } from "react-router-dom";
import { settingsRoutes } from "../../constants/routes";
import SettingsTable from "../../components/profile/settings/settingsTable/SettingsTable";
import { useEffect, useState } from "react";
import ProfileService from "../../services/profileService";
import { APP_ENV } from "../../env";
import defaultImage from "../../assets/default-image.jpg";
import { useQuery } from "@tanstack/react-query";
import {
  getSettingsCategory
} from "../../components/profile/settings/settingsCategories/settingsCategories";

const Settings = () => {
  const { section, block } = useParams();
  const selectedSection = section || settingsRoutes.sections.params;
  const [currentSettings, setCurrentSettings] = useState([]);
  const { data: profile } = useQuery({
    queryFn: () => ProfileService.getProfile(),
    queryKey: ['profile'],
    select: ({ data }) => data,
  });

  useEffect(() => {
    const fetchSettingsCategory = async (category) => {
      try {
        const settings = await getSettingsCategory(category);
        setCurrentSettings(settings);
      } catch (error) {
        console.error("Error fetching settings category:", error);
        // Handle error accordingly
      }
    };

    fetchSettingsCategory(selectedSection);
  }, [selectedSection, block]);

  const getColor = (sectionName) => {
    if (sectionName === selectedSection) {
      return "indigo-500";
    }
    return "black";
  };

  const profileImage = profile?.image
    ? APP_ENV.UPLOADS_URL + "/" + profile?.image
    : defaultImage;

  return (
    <div className="bg-[#E7E7E7] w-full h-[1100px] py-24 px-5 sm:px-0 sm:flex sm:justify-center">
      <div className="w-full sm:w-1/4 bg-white h-[150px] sm:h-[900px] rounded-lg overflow-hidden py-8 px-6 sm:inline-block text-center sm:text-left">
        <div className="text-left flex sm:block justify-center items-center">
          <img
            className="w-[45px] h-[45px] rounded-full hover:opacity-45 transition duration-300 ease-in-out inline-block sm:block"
            src={profileImage}
            alt="noData"
          ></img>
          <div className="sm:mt-3 text-2xl font-semibold inline-block sm:block ml-3 sm:ml-0">
            Settings
          </div>
        </div>

        <Link
          to={`/j4y${settingsRoutes.settings}${settingsRoutes.sections.params}`}
          className={`text-${getColor(
            settingsRoutes.sections.params
          )} my-7 w-fit hover:text-indigo-500 transition duration-300 ease-in-out inline-block sm:block float-left`}
        >
          <UserIcon className="inline-block pb-[4px] w-[33px] h-[33px]" />
          <div className="ml-[10px] hidden sm:inline-block">
            Account parameters
          </div>
        </Link>
        <Link
          to={`/j4y${settingsRoutes.settings}${settingsRoutes.sections.security}`}
          className={`text-${getColor(
            settingsRoutes.sections.security
          )} my-7 w-fit hover:text-indigo-500 transition duration-300 ease-in-out inline-block sm:block`}
        >
          <LockClosedIcon className="inline-block pb-[4px] w-[33px] h-[33px]" />
          <div className="ml-[10px] hidden sm:inline-block">
            Sign-in and Security
          </div>
        </Link>
        <Link
          to={`/j4y${settingsRoutes.settings}${settingsRoutes.sections.visibility}`}
          className={`text-${getColor(
            settingsRoutes.sections.visibility
          )} my-7 w-fit hover:text-indigo-500 transition duration-300 ease-in-out inline-block sm:block float-right sm:float-none`}
        >
          <EyeIcon className="inline-block pb-[4px] w-[35px] h-[35px]" />
          <div className="ml-[10px] hidden sm:inline-block">Visibility</div>
        </Link>
      </div>
      <SettingsTable settings={currentSettings} block={block} />
    </div>
  );
};

export default Settings;
