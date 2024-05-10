import Block from "../Block/Block";
import EmailChange from "../Block/EmailChange/EmailChange";
import CloseAccount from "../CloseAccount/CloseAccount";
import Contacts from "../Contacts/Contacts";
import ContentLanguageBlock from "../ContentLanguage/ContentLanguageBlock";
import FindByEmailBlock from "../FindByEmail/FindByEmailBlock";
import FindByPhoneNumber from "../FindByPhoneNumber/FindByPhoneNumber";
import FollowingsVisibility from "../FollowingsVisibiliy/FollowingsVisibility";
import LanguageBlock from "../Language/LanguageBlock";
import ManageActivityStatus from "../ManageActivityStatus/ManageActivityStatus";
import PasswordChange from "../PasswordChange/PasswordChange";
import PhoneBlock from "../Phone/Phone";
import ProfileViewing from "../ProfileViewing/ProfileViewing";
import SurnameVisibility from "../SurnameVisibility/SurnameVisibility";
import TwoStepAuth from "../TwoStepAuth/TwoStepAuth";
import AutoPlayBlock from "./AutoPlay/AutoPlayBlock";
import EmailVisibility from "./EmailVisibility/EmailVisibility";
import EnableAudioBlock from "./EnableAudio/EnableAudioBlock";
import ShowProfilePhotos from "./ShowProfilePhotos/ShowProfilePhotos";
import SleepMode from "./SleepMode/SleepMode";
import StringParams from "./StringParams/StringParams";

const SettingBlockElement = (block) => {
  switch (block) {
    case "language":
      return <LanguageBlock />;
    case "contentLanguage":
      return <ContentLanguageBlock />;
    case "passwordChange":
      return <PasswordChange />;
    case "profilePhotos":
      return <ShowProfilePhotos />;
    case "stringParams":
      return <StringParams />;
    case "sleepMode":
      return <SleepMode />;
    case "phone":
      return <PhoneBlock />;
    case "surname":
      return <SurnameVisibility />;
    case "findByEmail":
      return <FindByEmailBlock />;
    case "findByPhoneNumber":
      return <FindByPhoneNumber />;
    case "block":
      return <Block />;
    case "conactsVisibility":
      return <Contacts />;
    case "enableAudio":
      return <EnableAudioBlock />;
    case "autoPlay":
      return <AutoPlayBlock />;
    case 'followings':
      return <FollowingsVisibility />;
    case "emailVisibility": 
      return <EmailVisibility />
    case "profileView":
      return <ProfileViewing />
    case 'manageActivityStatus':
      return <ManageActivityStatus />
    case 'twoStepAuth':
      return <TwoStepAuth />
    case 'emailChange': 
      return <EmailChange />
    case 'closeAccount':
      return <CloseAccount />
    default:
      return <></>;
  }
};

export default SettingBlockElement;
