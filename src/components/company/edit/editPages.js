import EditGeneralInformationPage from "./EditGeneralInformationPage"
import HeaderEditPage from "./HeaderEditPage"

const pages = [
	{
		title: "Page header",
		to: "header",
		component: <HeaderEditPage />,
	},
	{
		title: "General information",
		to: "general-information",
		component: <EditGeneralInformationPage />,
	},
	{
		title: "Work setup",
		to: "work-setup",
		component: <HeaderEditPage />,
	},
	{
		title: "Location",
		to: "location",
		component: <HeaderEditPage />,
	},
]
export { pages }
