import * as yup from "yup";

export const RegisterSchema = yup.object({
    email: yup.string().required('auth.validation.emptyEmail').email("auth.validation.email"),
    password: yup.string().required("auth.validation.emptyPassword").min(6, "auth.validation.minPassword"),
    firstName: yup.string().required('auth.validation.emptyFirstName'),
    lastName: yup.string().required('auth.validation.emptyLastName'),
    country: yup.string().required('auth.validation.emptyCountry'),
    terms: yup.boolean().required('auth.validation.emptyCity')
});