import PermissionsPage from "./PermissionsPage"
import VisibilityPage from "./VisibilityPage"
import DeactivationPage from "./DeactivationPage"

const pages = [
	{
		title: "company.settingsPage.page1.title",
		description: "company.settingsPage.page1.description",
		to: "permission",
		component: <PermissionsPage />,
		isOnlyForOwner: false,
	},
	{
		title: "company.settingsPage.page2.title",
		description: "company.settingsPage.page2.description",
		to: "visibility",
		component: <VisibilityPage />,
		isOnlyForOwner: false,
	},
	{
		title: "company.settingsPage.page3.title",
		description: "company.settingsPage.page3.description",
		to: "deactivation",
		component: <DeactivationPage />,
		isOnlyForOwner: true,
	},
]

export { pages }
