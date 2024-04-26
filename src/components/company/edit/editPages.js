import EditCompanyLocation from "./EditCompanyLocation"
import EditGeneralInformationPage from "./EditGeneralInformationPage"
import EditWorkSetupPage from "./EditWorkSetupPage"
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
		component: <EditWorkSetupPage />,
	},
	{
		title: "Location",
		to: "location",
		component: <EditCompanyLocation />,
	},
]
export { pages }
