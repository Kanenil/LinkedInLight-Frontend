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
      { name: "String params" },
      { name: "People who also have seen", prescription: "enabled" },
      { name: "People you stopped following", prescription: "enabled" },
    ],
  },
  {
    category: "Synchronization parameters",
    items: [{ name: "Synchronize calendar" }, { name: "Synchronize contacts" }],
  },
  {
    category: "Subscription and payment",
    items: [{ name: "Free plan" }, { name: "View purchase history" }],
  },
  {
    category: "Partners and services",
    items: [{ name: "Microsoft" }],
  },
  {
    category: "Account management",
    items: [
      { name: "Put your account into sleep mode" },
      { name: "Close your account" },
    ],
  },
];

export const securitySettings = [
  {
    category: "Access to the account",
    items: [
      { name: "Email", prescription: "test@gmail.com" },
      { name: "Phone" },
      {
        name: "Change password",
        link: `${settingsRoutes.sections.security}/passwordChange`,
      },
      { name: "Access keys" },
      { name: "Log in locations" },
      { name: "Devices where your password has been saved" },
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
      { name: "Contacts", prescription: "enabled" },
      { name: "People able to see your followings", prescription: "enabled" },
      { name: "People able to see your surname" },
      {
        name: "Representation of your organization and interests",
        prescription: "enabled",
      },
      {
        name: "The owners of the company page export your data",
        prescription: "enabled",
      },
      { name: "Finding ad visibility of your profile outside j4Y" },
      {
        name: "Finding your profile by email",
        prescription: "1st level contacts",
      },
      {
        name: "Finding your profile by phone number",
        prescription: "Anybody",
      },
      { name: "Block" },
    ],
  },
  {
    category: "j4Y activity visibility",
    items: [
      { name: "Manage activity status", prescription: "Contacts only" },
      {
        name: "Granting shared access to profile updates online",
        prescription: "enabled",
      },
      {
        name: "Notify contacts about your appearance in news",
        prescription: "enabled",
      },
      {
        name: "Mention or tags",
        prescription: "enabled",
      },
      { name: "Followers" },
    ],
  },
];
