import {useFormik} from "formik";
import {LoginSchema} from "./validation";
import {Link} from "react-router-dom";
import {routes} from "../../../constants/routes";
import GoogleButton from "../../../elements/buttons/GoogleButton";
import {useAuth} from "../../../hooks/useAuth";
import FormGroup from "../../../components/shared/forms/FormGroup";
import {jwtDecode} from "jwt-decode";
import Logo from "../../../elements/shared/Logo";
import AppleButton from "../../../elements/buttons/AppleButton";
import FacebookButton from "../../../elements/buttons/FacebookButton";
import illustration from "../../../assets/login-illustration.jpg";
import {Helmet} from "react-helmet-async";
import React from "react";
import {useTranslation} from "react-i18next";
import {XMarkIcon} from "@heroicons/react/24/solid";
import useMobileDetector from "../../../hooks/useMobileDetector";
import Show from "../../../elements/shared/Show";

const SignIn = () => {
    const {t} = useTranslation();

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

    const {isMobile} = useMobileDetector();

    return (
        <React.Fragment>
            <Helmet>
                <title>{t('auth.logIn')}</title>
            </Helmet>
            <Show>
                <Show.When isTrue={!isMobile}>
                    <div className="flex-grow flex flex-col bg-[#E7E7E7]">
                        <div
                            className="items-center my-auto mx-auto bg-white min-w-2xl rounded-lg overflow-hidden h-full w-[1140px]"
                            style={{boxShadow: '0px 1px 6px 0px #00000029'}}>
                            <div className="flex flex-row h-full">
                                <form onSubmit={handleSubmit} className="w-1/2 p-11">
                                    <Link to='/'>
                                        <Logo className="fill-black h-[55px] p-[5px] mx-auto"/>
                                    </Link>

                                    <div className="flex flex-row mt-5">
                                        <div className="flex w-full border-b-[1px] border-[#585359]">
                                            <Link to={routes.signIn} className="py-[5px] mx-auto uppercase text-[#585359] text-xs">
                                                {t('auth.logIn')}
                                            </Link>
                                        </div>
                                        <div className="flex w-full">
                                            <Link to={routes.signUp} className="py-[5px] mx-auto uppercase text-[#585359] text-xs">
                                                {t('auth.signUp')}
                                            </Link>
                                        </div>
                                    </div>

                                    <FormGroup margin="mt-[30px]" name="email" value={values.email} type="email"
                                               touched={touched.email}
                                               error={errors.email} title={t('auth.email')} handleChange={handleChange}/>

                                    <FormGroup margin="my-[12px]" name="password" value={values.password} type="password"
                                               touched={touched.password}
                                               error={errors.password} title={t('auth.password')} handleChange={handleChange}/>

                                    <Link to={routes.forgetPassword} className="text-xs text-[#7D7D7D] hover:text-[#24459A]">
                                        {t('auth.forgotPassword')}
                                    </Link>

                                    <button type="submit"
                                            className="bg-[#24459A] w-full rounded-xl border-[1px] border-[#B4BFDD] mt-[24px] py-[10px] px-[20px] font-semibold text-base text-white">
                                        {t('auth.logIn')}
                                    </button>

                                    <h1 className="mt-[12px] text-center uppercase text-xs text-[#7D7D7D]">{t('auth.or')}</h1>

                                    <div
                                        className="flex flex-row justify-center gap-[20px] pt-[10px] pb-[20px] py-[20px] mt-[12px]">
                                        <GoogleButton googleLoginCallback={googleCallback}/>
                                        <AppleButton/>
                                        <FacebookButton/>
                                    </div>

                                    <div className="flex flex-row justify-center gap-2 mt-[12px] text-[#7D7D7D] text-sm pb-[210px]">
                                        <span className="font-light">{t('auth.noAccount')}</span>

                                        <Link className="font-bold" to={routes.signUp}>{t('auth.signUp')}</Link>
                                    </div>
                                </form>
                                <div className="w-3/4 flex justify-center items-center">
                                    <img src={illustration} alt="illustration" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Show.When>

                <Show.Else>
                    <div className="flex-grow flex flex-col px-6 py-8">
                        <div className="flex flex-row items-center">
                            <Link to='/'>
                                <Logo className="pb-3 mr-auto fill-[#2D2A33] h-10 md:h-16"/>
                            </Link>

                            <Link to="/m/auth" className="ml-auto text-[#7D7D7D] hover:text-gray-700">
                                <XMarkIcon className="w-10 h-10"/>
                            </Link>
                        </div>

                        <div className="flex flex-col mt-10">
                            <div className="py-2 w-full border-b-[#24459A] border-b-[0.5px]">
                                <h1 className="text-[#585359] font-jost font-bold text-xl">{t('auth.logIn')}</h1>
                            </div>

                            <div className="flex flex-row items-center gap-3">
                                <span className="font-jost text-lg">{t('auth.or')}</span>
                                <Link to='/m/auth/sign-up' className="text-lg text-[#24459A] font-bold">{t('auth.joinTo')}</Link>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-10">
                            <FormGroup margin="mt-[30px]" name="email" value={values.email} type="email"
                                       touched={touched.email}
                                       error={errors.email} title={t('auth.email')} handleChange={handleChange}/>

                            <FormGroup margin="my-[12px]" name="password" value={values.password} type="password"
                                       touched={touched.password}
                                       error={errors.password} title={t('auth.password')} handleChange={handleChange}/>

                            <Link to={routes.forgetPassword} className="text-xs text-[#7D7D7D] hover:text-[#24459A]">
                                {t('auth.forgotPassword')}
                            </Link>

                            <button type="submit"
                                    className="bg-[#24459A] w-full rounded-xl border-[1px] border-[#B4BFDD] mt-[24px] py-[10px] px-[20px] font-semibold text-base text-white">
                                {t('auth.logIn')}
                            </button>

                            <h1 className="mt-[12px] text-center uppercase text-xs text-[#7D7D7D]">{t('auth.or')}</h1>

                            <div
                                className="flex flex-row justify-center gap-[20px] pt-[10px] pb-[20px] py-[20px] mt-[12px]">
                                <GoogleButton googleLoginCallback={googleCallback}/>
                                <AppleButton/>
                                <FacebookButton/>
                            </div>

                            <div className="flex flex-row justify-center gap-2 mt-[12px] text-[#7D7D7D] text-sm pb-[210px]">
                                <span className="font-light">{t('auth.noAccount')}</span>

                                <Link className="font-bold text-[#24459A]" to="/m/auth/sign-up">{t('auth.signUp')}</Link>
                            </div>
                        </form>
                    </div>
                </Show.Else>
            </Show>
        </React.Fragment>
    )
}
export default SignIn;