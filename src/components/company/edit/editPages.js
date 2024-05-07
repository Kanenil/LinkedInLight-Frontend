import EditCompanyLocation from "./EditCompanyLocation"
import EditGeneralInformationPage from "./EditGeneralInformationPage"
import EditWorkSetupPage from "./EditWorkSetupPage"
import HeaderEditPage from "./HeaderEditPage"

const pages = [
	{
		title: "company.editPages.header.title",
		to: "header",
		component: <HeaderEditPage />,
	},
	{
		title: "company.editPages.generalInformation.title",
		to: "general-information",
		component: <EditGeneralInformationPage />,
	},
	{
		title: "company.editPages.workSetup.title",
		to: "work-setup",
		component: <EditWorkSetupPage />,
	},
	{
		title: "company.editPages.location.title",
		to: "location",
		component: <EditCompanyLocation />,
	},
]
export { pages }
