export const routes = {
  signIn: "/auth/sign-in",
  signUp: "/auth/sign-up",
  confirmEmail: "/auth/confirm-email",
  forgetPassword: "/forget-password",
  chats: "/in/chats",
};

export const generalRoutes = [
  {
    name: "Sign In",
    route: routes.signIn,
  },
  {
    name: "Sign Up",
    route: routes.signUp,
  },
  {
    name: "Help Center",
    route: "/",
  },
  {
    name: "Careers",
    route: "/",
  },
  {
    name: "Developers",
    route: "/",
  },
  {
    name: "Blog",
    route: "/",
  },
];

export const businessRoutes = [
  {
    name: "Talent",
    route: "/",
  },
  {
    name: "Marketing",
    route: "/",
  },
  {
    name: "Sales",
    route: "/",
  },
  {
    name: "Learning",
    route: "/",
  },
];

export const talentRoutes = [
  {
    name: "Learn",
    route: "/",
  },
  {
    name: "Earn",
    route: "/",
  },
  {
    name: "Compete",
    route: "/",
  },
  {
    name: "Job",
    route: "/",
  },
];

export const directoriesRoutes = [
  {
    name: "Members",
    route: "/",
  },
  {
    name: "Jobs",
    route: "/",
  },
  {
    name: "Companies",
    route: "/",
  },
  {
    name: "Featured",
    route: "/",
  },
  {
    name: "Learning",
    route: "/",
  },
  {
    name: "Posts",
    route: "/",
  },
  {
    name: "News Letters",
    route: "/",
  },
  {
    name: "Services",
    route: "/",
  },
  {
    name: "Products",
    route: "/",
  },
  {
    name: "Advice",
    route: "/",
  },
  {
    name: "People Search",
    route: "/",
  },
];

export const contactRoutes = [
  {
    name: "Support",
    route: "/",
  },
  {
    name: "Report a Bug",
    route: "/",
  },
];

export const legalRoutes = [
  {
    name: "User Agreement",
    route: "/",
  },
  {
    name: "Privacy Policy",
    route: "/",
  },
  {
    name: "Copyright Policy",
    route: "/",
  },
  {
    name: "Brand Policy",
    route: "/",
  },
  {
    name: "Community Guidelines",
    route: "/",
  },
];

export const settingsRoutes = {
  settings: "/settings/",
  sections: {
    params: "params",
    security: "security",
    visibility: "visibility",
  },
};
