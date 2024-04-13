import LanguageBlock from "../Language/LanguageBlock";
import PasswordChange from "../PasswordChange/PasswordChange";
import ShowProfilePhotos from "./ShowProfilePhotos/ShowProfilePhotos";

const SettingBlockElement = (block) => {
  switch (block) {
    case "language":
      return <LanguageBlock />;
    case "passwordChange":
      return <PasswordChange />;
    case "profilePhotos":
      return <ShowProfilePhotos />;
    default:
      return <></>;
  }
};

export default SettingBlockElement;
