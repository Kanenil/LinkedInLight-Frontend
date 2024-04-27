import { settingsRoutes } from "../../../../constants/routes";

export const accountParams = [
  {
    category: "Profile info",
    items: [
      { name: "Name, region and field" },
      { name: "Personal demographic information" },
      { name: "Confirmation" },
    ],
  },
  {
    category: "General",
    items: [
      { name: "Language", link: `${settingsRoutes.sections.params}/language` },
      { name: "Content language" },
      { name: "Video autoplay", prescription: "enabled" },
      { name: "Audio effects", prescription: "enabled" },
      {
        name: "Show profile photos",
        prescription: "All members of jY4",
        link: `${settingsRoutes.sections.params}/profilePhotos`,
      },
      {
        name: "String params",
        link: `${settingsRoutes.sections.params}/stringParams`,
      },
    ],
  },
  {
    category: "Account management",
    items: [
      {
        name: "Put your account into sleep mode",
        link: `${settingsRoutes.sections.params}/sleepMode`,
      },
      { name: "Close your account" },
    ],
  },
];

export const securitySettings = [
  {
    category: "Access to the account",
    items: [
      { name: "Email", prescription: "test@gmail.com" },
      { name: "Phone", link: `${settingsRoutes.sections.security}/phone` },
      {
        name: "Change password",
        link: `${settingsRoutes.sections.security}/passwordChange`,
      },
      { name: "Two factory authentication", prescription: "disabled" },
    ],
  },
];

export const visibilitySettings = [
  {
    category: "Your profile and network visibility",
    items: [
      { name: "Profile viewing options", prescription: "Your name and title" },
      { name: "Edit public profile" },
      { name: "People able to see your email" },
      {
        name: "Contacts",
        prescription: "enabled",
        link: `${settingsRoutes.sections.visibility}/conactsVisibility`,
      },
      { name: "People able to see your followings", prescription: "enabled" },
      {
        name: "People able to see your surname",
        link: `${settingsRoutes.sections.visibility}/surname`,
      },
      {
        name: "Finding your profile by email",
        prescription: "1st level contacts",
        link: `${settingsRoutes.sections.visibility}/findByEmail`,
      },
      {
        name: "Finding your profile by phone number",
        prescription: "Anybody",
        link: `${settingsRoutes.sections.visibility}/findByPhoneNumber`,
      },
      {
        name: "Block",
        link: `${settingsRoutes.sections.visibility}/block`,
      },
    ],
  },
  {
    category: "j4Y activity visibility",
    items: [{ name: "Manage activity status", prescription: "Contacts only" }],
  },
];
