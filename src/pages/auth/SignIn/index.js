import {useFormik} from "formik";
import {LoginSchema} from "./validation";
import {Link} from "react-router-dom";
import {routes} from "../../../constants/routes";
import GoogleButton from "../../../elements/buttons/GoogleButton";
import {useAuth} from "../../../hooks/auth";
import FormGroup from "../../../components/shared/forms/FormGroup";
import {jwtDecode} from "jwt-decode";
import Logo from "../../../elements/shared/Logo";
import AppleButton from "../../../elements/buttons/AppleButton";
import FacebookButton from "../../../elements/buttons/FacebookButton";
import illustration from "../../../assets/login-illustration.jpg";

const SignIn = () => {
    const {login, googleLogin} = useAuth();

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
        <div className="flex-grow flex flex-col bg-[#E7E7E7]">
            <div
                className="items-center my-auto mx-auto bg-white min-w-2xl rounded-lg overflow-hidden h-full w-[1140px]"
                style={{boxShadow: '0px 1px 6px 0px #00000029'}}>
                <div className="flex flex-row h-full">
                    <form onSubmit={handleSubmit} className="w-1/2 p-11">
                        <Logo className="fill-black h-[55px] p-[5px] mx-auto"/>

                        <div className="flex flex-row mt-5">
                            <div className="flex w-full border-b-[1px] border-[#585359]">
                                <Link to={routes.signIn} className="py-[5px] mx-auto uppercase text-[#585359] text-xs">
                                    Log in
                                </Link>
                            </div>
                            <div className="flex w-full">
                                <Link to={routes.signUp} className="py-[5px] mx-auto uppercase text-[#585359] text-xs">
                                    Sign up
                                </Link>
                            </div>
                        </div>

                        <FormGroup margin="mt-[30px]" name="email" value={values.email} type="email"
                                   touched={touched.email}
                                   error={errors.email} title="Username/Email" handleChange={handleChange}/>

                        <FormGroup margin="my-[12px]" name="password" value={values.password} type="password"
                                   touched={touched.password}
                                   error={errors.password} title="Password" handleChange={handleChange}/>

                        <Link to={routes.forgetPassword} className="text-xs text-[#7D7D7D]">
                            Forgot your password?
                        </Link>

                        <button type="submit"
                                className="bg-[#24459A] w-full rounded-xl border-[1px] border-[#B4BFDD] mt-[24px] py-[10px] px-[20px] font-semibold text-base text-white">
                            Log In
                        </button>

                        <h1 className="mt-[12px] text-center uppercase text-xs text-[#7D7D7D]">or</h1>

                        <div
                            className="flex flex-row justify-center gap-[20px] pt-[10px] pb-[20px] py-[20px] mt-[12px]">
                            <GoogleButton googleLoginCallback={googleCallback}/>
                            <AppleButton/>
                            <FacebookButton/>
                        </div>

                        <div className="flex flex-row justify-center gap-2 mt-[12px] text-[#7D7D7D] text-sm pb-[210px]">
                            <span className="font-light">Do you have an account?</span>

                            <Link className="font-bold" to={routes.signUp}>Sign Up</Link>
                        </div>
                    </form>
                    <div className="w-3/4 flex justify-center items-center">
                        <img src={illustration} alt="illustration" />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SignIn;