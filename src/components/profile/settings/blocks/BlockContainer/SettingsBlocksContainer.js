import LanguageBlock from "../Language/LanguageBlock";
import PasswordChange from "../PasswordChange/PasswordChange";

export const settingsBlocks = {
  language: LanguageBlock(),
  passwordChange: PasswordChange(),
};

const settingBlockElement = (block) => {
  switch (block) {
    case "language":
      return LanguageBlock();
    case "passwordChange":
      return <PasswordChange />;
    default:
      return <></>;
  }
};

export default settingBlockElement;
