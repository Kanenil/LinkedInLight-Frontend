import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import HttpBackend from "i18next-http-backend"
import intervalPlural from "i18next-intervalplural-postprocessor"

const languages = ["en", "uk"]

i18n
	.use(HttpBackend)
	.use(intervalPlural)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: "en",
		whitelist: languages,
		backend: {
			loadPath: "/locales/{{lng}}/{{ns}}.json",
		},
		interpolation: {
			escapeValue: false,
		},
		react: {
			useSuspense: true,
		},
	})
