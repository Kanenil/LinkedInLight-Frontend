import {useFormik} from "formik";
import {LoginSchema} from "../LogIn/validation";
import {Link} from "react-router-dom";
import classNames from "classnames";
import {routes} from "../../../constants/routes";
import {useAuth} from "../../../hooks/auth";

const SignIn = () => {
    const initValues = {
        email: "",
        password: "",
    };

    const { register } = useAuth();

    const onSubmitFormik = async (values) => {
        await register({...values, setErrors });
    }

    const formik = useFormik({
        initialValues: initValues,
        validationSchema: LoginSchema,
        onSubmit: onSubmitFormik,
    });

    const {values, errors, touched, handleSubmit, handleChange, setErrors} = formik;

    return (
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
            <form
                className="w-full px-6 py-8 md:px-8"
                onSubmit={handleSubmit}
            >
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
                    <label
                        className="block mb-2 text-sm font-medium text-gray-600"
                        htmlFor="password"
                    >
                        Password
                    </label>
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
                        Register
                    </button>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <span className="w-1/5 border-b md:w-1/4"></span>

                    <Link
                        to={routes.logIn}
                        className="text-xs text-gray-500 uppercase hover:underline"
                    >
                        or login
                    </Link>

                    <span className="w-1/5 border-b md:w-1/4"></span>
                </div>
            </form>
        </div>
    )
}
export default SignIn;