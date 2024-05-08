import Block from "../Block/Block";
import Contacts from "../Contacts/Contacts";
import ContentLanguageBlock from "../ContentLanguage/ContentLanguageBlock";
import FindByEmailBlock from "../FindByEmail/FindByEmailBlock";
import FindByPhoneNumber from "../FindByPhoneNumber/FindByPhoneNumber";
import LanguageBlock from "../Language/LanguageBlock";
import PasswordChange from "../PasswordChange/PasswordChange";
import PhoneBlock from "../Phone/Phone";
import SurnameVisibility from "../SurnameVisibility/SurnameVisibility";
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
    default:
      return <></>;
  }
};

export default SettingBlockElement;
