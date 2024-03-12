import * as yup from "yup";

export const LoginSchema = yup.object({
    email: yup.string().required("Email can not be empty!").email("Enter an email!"),
    password: yup.string().required("Password can not be empty!"),
});