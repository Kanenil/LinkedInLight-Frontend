import { settingsRoutes } from "../../../../constants/routes";
import AccountPreferenceService from "../../../../services/AccountPreferenceService";
import profileService from "../../../../services/profileService";
import settingsService from "../../../../services/settingsService";

const profile = await profileService.getProfile()
const accountPreference = await AccountPreferenceService.AccountPreference()
const profileViewing = await settingsService.profileViewing()
const connectionVisibility = await settingsService.connectionVisibility()
const discoverByEmail = await settingsService.discoverByEmail()
const discoverByPhone = await settingsService.discoverByPhone()
const activeStatusVisibility = await settingsService.activeStatusVisibility()


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
      { name: "Content language", link: `${settingsRoutes.sections.params}/contentLanguage` },
      { name: "Video autoplay", prescription: accountPreference.data.videoAutoplay ? 'enabled' : 'disabled', link: `${settingsRoutes.sections.params}/autoPlay` },
      { name: "Audio effects", prescription: accountPreference.data.soundEffects ? 'enabled' : 'disabled', link: `${settingsRoutes.sections.params}/enableAudio` },
      {
        name: "Show profile photos",
        prescription: accountPreference.data.showProfilePhotos,
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
      { name: "Email", prescription: profile.data.email },
      { name: "Phone", link: `${settingsRoutes.sections.security}/phone` },
      {
        name: "Change password",
        link: `${settingsRoutes.sections.security}/passwordChange`,
      },
      { name: "Two factory authentication", prescription: profile.data.hasTwoStepVerification ? 'enabled' : 'disabled' },
    ],
  },
];

export const visibilitySettings = [
  {
    category: "Your profile and network visibility",
    items: [
      { name: "Profile viewing options", prescription: profileViewing.data },
      { name: "Edit public profile" },
      {
        name: "People able to see your email",
        link: `${settingsRoutes.sections.visibility}/emailVisibility` 
      },
      {
        name: "Contacts",
        prescription: "enabled",
        link: `${settingsRoutes.sections.visibility}/conactsVisibility`,
      },
      { name: "People able to see your followings", prescription: connectionVisibility.data,
        link: `${settingsRoutes.sections.visibility}/followings`
       },
      {
        name: "People able to see your surname",
        link: `${settingsRoutes.sections.visibility}/surname`,
      },
      {
        name: "Finding your profile by email",
        prescription: discoverByEmail.data,
        link: `${settingsRoutes.sections.visibility}/findByEmail`,
      },
      {
        name: "Finding your profile by phone number",
        prescription: discoverByPhone.data,
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
    items: [{ name: "Manage activity status", prescription: activeStatusVisibility.data }],
  },
];
