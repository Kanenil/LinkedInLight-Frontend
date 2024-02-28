import {useFormik} from "formik";
import {Link} from "react-router-dom";
import {routes} from "../../../constants/routes";
import {useAuth} from "../../../hooks/auth";
import {RegisterSchema} from "./validation";
import FormGroup from "../../../components/FormGroup/FormGroup";
import {useAuthguard} from "../../../hooks/authguard";

const SignIn = () => {
    useAuthguard();

    const initValues = {
        email: "",
        password: "",
        firstName: "",
        lastName: ""
    };

    const {register} = useAuth();

    const onSubmitFormik = async (values) => {
        await register({...values, setErrors});
    }

    const formik = useFormik({
        initialValues: initValues,
        validationSchema: RegisterSchema,
        onSubmit: onSubmitFormik,
    });

    const {values, errors, touched, handleSubmit, handleChange, setErrors} = formik;

    return (
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
            <form
                className="w-full px-6 py-8 md:px-8"
                onSubmit={handleSubmit}
            >
                <FormGroup name="firstName" value={values.firstName} type="text" touched={touched.firstName}
                           error={errors.firstName} title="First name" handleChange={handleChange}/>

                <FormGroup name="lastName" value={values.lastName} type="text" touched={touched.lastName}
                           error={errors.lastName} title="Last name" handleChange={handleChange}/>

                <FormGroup name="email" value={values.email} type="email" touched={touched.email}
                           error={errors.email} title="Email" handleChange={handleChange}/>

                <FormGroup name="password" value={values.password} type="password" touched={touched.password}
                           error={errors.password} title="Password" handleChange={handleChange}/>

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