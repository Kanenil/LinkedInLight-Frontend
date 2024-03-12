import {useFormik} from "formik";
import {Link} from "react-router-dom";
import {routes} from "../../../constants/routes";
import {useAuth} from "../../../hooks/auth";
import {RegisterSchema} from "./validation";
import FormGroup from "../../../components/FormGroup/FormGroup";
import {useAuthguard} from "../../../hooks/authguard";
import Logo from "../../../elements/Logo/Logo";
import GoogleButton from "../../../components/GoogleButton/GoogleButton";
import AppleButton from "../../../components/AppleButton/AppleButton";
import FacebookButton from "../../../components/FacebookButton/FacebookButton";
import {jwtDecode} from "jwt-decode";
import FormSelector from "../../../components/FormSelector/FormSelector";
import {useMemo, useState} from "react";

const SignUp = () => {
    useAuthguard();
    const [countries, setCountries] = useState([]); // State to store fetched countries

    useMemo(async () => {
        if (!countries.length) {
            const response = await fetch("https://restcountries.com/v3.1/all");
            const fetchedCountries = await response.json();

            setCountries(fetchedCountries.sort((a, b) => a.name.common.localeCompare(b.name.common)));
        }
    }, [countries]);

    const options = useMemo(() => {
        return countries.map(country => (
            country.name.common
        ));
    }, [countries]);

    const initValues = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        username: "",
        country: "",
        terms: false
    };

    const {register, googleLogin} = useAuth();

    const onSubmitFormik = async (values) => {
        const model = {
            email: values.email,
            password: values.password,
            firstName: values.firstName,
            lastname: values.lastname
        }

        await register({...model, setErrors});
    }

    const formik = useFormik({
        initialValues: initValues,
        validationSchema: RegisterSchema,
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
        <div className="flex flex-col bg-[#E7E7E7] h-screen w-screen py-[90px]">
            <div
                className="items-center my-auto mx-auto bg-white min-w-2xl rounded-lg overflow-hidden h-full w-[1140px]"
                style={{boxShadow: '0px 1px 6px 0px #00000029'}}>
                <div className="flex flex-row h-full">
                    <form onSubmit={handleSubmit} className="w-1/2 p-11">
                        <Logo className="fill-black h-[55px] p-[5px] mx-auto"/>

                        <div className="flex flex-row mt-5">
                            <div className="flex w-full">
                                <Link to={routes.signIn} className="py-[5px] mx-auto uppercase text-[#585359] text-xs">
                                    Log in
                                </Link>
                            </div>
                            <div className="flex w-full border-b-[1px] border-[#585359]">
                                <Link to={routes.signUp} className="py-[5px] mx-auto uppercase text-[#585359] text-xs">
                                    Sign up
                                </Link>
                            </div>
                        </div>

                        <FormGroup margin="mt-[30px]" name="firstName" value={values.firstName} type="text"
                                   touched={touched.firstName}
                                   error={errors.firstName} title="First Name" handleChange={handleChange}/>

                        <FormGroup margin="mt-[12px]" name="lastName" value={values.lastName} type="text"
                                   touched={touched.lastName}
                                   error={errors.lastName} title="Last Name" handleChange={handleChange}/>

                        <FormGroup margin="mt-[12px]" name="email" value={values.email} type="email"
                                   touched={touched.email}
                                   error={errors.email} title="Email" handleChange={handleChange}/>

                        <FormGroup margin="mt-[12px]" name="username" value={values.username} type="text"
                                   touched={touched.username}
                                   error={errors.username} title="Create a Username" handleChange={handleChange}/>

                        <FormGroup margin="my-[12px]" name="password" value={values.password} type="password"
                                   touched={touched.password}
                                   error={errors.password} title="Create a Password" handleChange={handleChange}/>

                        <FormSelector margin="mt-[12px]" name="country" value={values.country}
                                      touched={touched.country}
                                      options={options}
                                      error={errors.country} title="Select your country ..."
                                      handleChange={handleChange}/>

                        <div className="mt-[12px]">
                            <label
                                className="flex items-center cursor-pointer select-none"
                                htmlFor="terms">
                                <div className="relative">
                                    <input name="terms"
                                           value={values.terms}
                                           onChange={handleChange}
                                           className="hidden"
                                           type="checkbox"
                                           id="terms"/>
                                    <div
                                        className="box flex items-center justify-center w-[10px] h-[10px] rounded-sm border border-[#2D2A33] mr-2">
                                        <span className={values.terms === false?"opacity-0": ""}>
                                            <svg fill="none" height="6" viewBox="0 0 11 8" width="8"
                                                 xmlns="http://www.w3.org/2000/svg">
                                              <path
                                                  d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                                                  fill="#3056D3" stroke="#3056D3" strokeWidth="0.4"/>
                                              </svg>
                                        </span>
                                    </div>
                                </div>
                                <span className="text-xs text-[#7D7D7D]">
                                    Yes, I understand and agree to the Privacy Policy and Terms of <strong>Job for You</strong>.
                                </span>
                            </label>
                        </div>


                        <h1 className="mt-[12px] text-center uppercase text-xs text-[#7D7D7D]">or</h1>

                        <div
                            className="flex flex-row justify-center gap-[20px] pt-[10px] pb-[20px] py-[20px] mt-[12px]">
                            <GoogleButton googleLoginCallback={googleCallback}/>
                            <AppleButton/>
                            <FacebookButton/>
                        </div>

                        <button type="submit"
                                className="bg-[#24459A] w-full rounded-xl border-[1px] border-[#B4BFDD] mt-[12px] py-[10px] px-[20px] font-semibold text-base text-white">
                            Sign Up
                        </button>

                    </form>
                    <div className="bg-[#24459A] w-3/4"/>
                </div>
            </div>
        </div>
    )
}
export default SignUp;