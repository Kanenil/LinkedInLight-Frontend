import {useFormik} from "formik";
import {LoginSchema} from "./validation";
import classNames from "classnames";
import {Link} from "react-router-dom";
import {routes} from "../../../constants/routes";
import GoogleButton from "../../../components/GoogleButton/GoogleButton";
import {useAuth} from "../../../hooks/auth";

const LogIn = () => {
    const { login } = useAuth();

    const initValues = {
        email: "",
        password: "",
    };

    const onSubmitFormik = async (values) => {
        await login({...values, setErrors });
    }

    const formik = useFormik({
        initialValues: initValues,
        validationSchema: LoginSchema,
        onSubmit: onSubmitFormik,
    });

    const {values, errors, touched, handleSubmit, handleChange, setErrors} = formik;

    const googleCallback = (response) => {
        console.log(response)
    }

    return (
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
            <form
                className="w-full px-6 py-8 md:px-8"
                onSubmit={handleSubmit}
            >
                <GoogleButton type='button' googleLoginCallback={googleCallback}/>

                <div className="flex items-center justify-between mt-4">
                    <span className="w-1/5 border-b lg:w-1/4"></span>

                    <Link
                        to=""
                        className="text-xs text-center text-gray-500 uppercase hover:underline"
                    >
                        by email
                    </Link>

                    <span className="w-1/5 border-b lg:w-1/4"></span>
                </div>

                <div className="mt-4">
                    <label
                        className="block mb-2 text-sm font-medium text-gray-600"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        onChange={handleChange}
                        value={values.email}
                        name="email"
                        className={classNames(
                            "block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300",
                            {
                                "focus:border-red-400 focus:ring-red-300 border-red-400":
                                    touched.email && errors.email,
                                "focus:border-green-400 focus:ring-green-300 border-green-400":
                                    touched.email && !errors.email,
                            }
                        )}
                        type="email"
                    />
                    {touched.email && errors.email && (
                        <p className="mt-3 text-xs text-red-400">{errors.email}</p>
                    )}
                </div>

                <div className="mt-4">
                    <div className="flex justify-between">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-600"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <Link
                            to={routes.forgetPassword}
                            className="text-xs text-gray-500 hover:underline"
                        >
                            Forget password?
                        </Link>
                    </div>

                    <input
                        id="password"
                        onChange={handleChange}
                        value={values.password}
                        name="password"
                        className={classNames(
                            "block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300",
                            {
                                "focus:border-red-400 focus:ring-red-300 border-red-400":
                                    touched.password && errors.password,
                                "focus:border-green-400 focus:ring-green-300 border-green-400":
                                    touched.password && !errors.password,
                            }
                        )}
                        type="password"
                    />
                    {touched.password && errors.password && (
                        <p className="mt-3 text-xs text-red-400">{errors.password}</p>
                    )}
                </div>

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