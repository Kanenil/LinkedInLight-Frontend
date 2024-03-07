import {useFormik} from "formik";
import {LoginSchema} from "./validation";
import {Link, useSearchParams} from "react-router-dom";
import {routes} from "../../../constants/routes";
import GoogleButton from "../../../components/GoogleButton/GoogleButton";
import {useAuth} from "../../../hooks/auth";
import FormGroup from "../../../components/FormGroup/FormGroup";
import Alert from "../../../components/Alert/Alert";
import {useEffect, useState} from "react";
import {useAuthguard} from "../../../hooks/authguard";
import {jwtDecode} from "jwt-decode";

const LogIn = () => {
    useAuthguard();

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [searchParams] = useSearchParams();

    const {login, googleLogin} = useAuth();

    useEffect(() => {
        if (searchParams.has("registration") && searchParams.get("registration") === "success") {
            setAlertMessage("You successfully registered! Now you can login.");
            setAlertOpen(true);
        }
    }, [searchParams])

    const initValues = {
        email: "",
        password: "",
    };

    const onSubmitFormik = async (values) => {
        await login({...values, setErrors});
    }

    const formik = useFormik({
        initialValues: initValues,
        validationSchema: LoginSchema,
        onSubmit: onSubmitFormik,
    });

    const {values, errors, touched, handleSubmit, handleChange, setErrors} = formik;

    const googleCallback = async (response) => {
        const {email, family_name, given_name} = jwtDecode(response.credential);

        await googleLogin({
            username: email,
            email,
            firstName: given_name,
            lastName: family_name || '',
            token: response.credential
        });
    }

    return (
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
            <form
                className="w-full px-6 py-8 md:px-8"
                onSubmit={handleSubmit}
            >
                <Alert
                    text={alertMessage}
                    type={"success"}
                    open={alertOpen}
                    setOpen={setAlertOpen}
                />

                <GoogleButton type='button' googleLoginCallback={googleCallback}/>

                <div className="flex items-center justify-between mt-4">
                    <span className="w-1/5 border-b lg:w-1/4"></span>

                    <Link
                        to=""
                        className="text-xs text-center text-gray-500 uppercase hover:underline"
                    >
                        or email
                    </Link>

                    <span className="w-1/5 border-b lg:w-1/4"></span>
                </div>

                <FormGroup name="email" value={values.email} type="email" touched={touched.email}
                           error={errors.email} title="Email" handleChange={handleChange}/>

                <FormGroup name="password" value={values.password} type="password" touched={touched.password}
                           error={errors.password} title="Password" handleChange={handleChange}/>

                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                    >
                        Login
                    </button>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <span className="w-1/5 border-b md:w-1/4"></span>

                    <Link
                        to={routes.signIn}
                        className="text-xs text-gray-500 uppercase hover:underline"
                    >
                        or register
                    </Link>

                    <span className="w-1/5 border-b md:w-1/4"></span>
                </div>
            </form>
        </div>
    )
}
export default LogIn;