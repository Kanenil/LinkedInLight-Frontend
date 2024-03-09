import * as yup from "yup";

export const RegisterSchema = yup.object({
    email: yup.string().required("Email can not be empty!").email("Enter an email!"),
    password: yup.string().required("Password can not be empty!"),
    firstName: yup.string().required("First name can not be empty!"),
    lastName: yup.string().required("Last name can not be empty!"),
    username: yup.string().required("Username can not be empty!"),
    country: yup.string().required("Select your country"),
    terms: yup.boolean().required()
});