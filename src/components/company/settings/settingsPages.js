import PermissionsPage from "./PermissionsPage";
import VisibilityPage from "./VisibilityPage";

const pages = [
    {
        title: 'Page Access Management',
        description: 'Control who manages your page here.',
        to: 'permission',
        component: <PermissionsPage/>
    },
    {
        title: 'Page Visibility Settings',
        description: 'Configure restrictions on how your page information is displayed in search engines and other services, as well as content visibility for non-subscribers.',
        to: 'visibility',
        component: <VisibilityPage/>
    },
    {
        title: 'Page Deactivation',
        description: 'Delete your page here.',
        to: 'deactivation',
        component: <PermissionsPage/>
    }
]

export {pages};