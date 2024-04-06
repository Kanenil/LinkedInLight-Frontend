import * as yup from "yup";

export const LoginSchema = yup.object({
    email: yup.string().required('auth.validation.emptyEmail').email("auth.validation.email"),
    password: yup.string().required("auth.validation.emptyPassword").min(6, "auth.validation.minPassword")
});