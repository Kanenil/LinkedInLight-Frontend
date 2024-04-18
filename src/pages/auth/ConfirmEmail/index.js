import Logo from "../../../elements/shared/Logo";
import {Link, useSearchParams} from "react-router-dom";
import {routes} from "../../../constants/routes";
import React, {useEffect, useRef, useState} from "react";
import {useAuth} from "../../../hooks/useAuth";
import {useLocation, useNavigate} from "react-router";
import {Helmet} from "react-helmet-async";
import {useTranslation} from "react-i18next";
import useMobileDetector from "../../../hooks/useMobileDetector";
import Show from "../../../elements/shared/Show";
import {XMarkIcon} from "@heroicons/react/24/solid";

const ConfirmEmail = () => {
    const {t} = useTranslation();
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const navigator = useNavigate();

    const parseParams = (params = "") => {
        const rawParams = params.replace("?", "").split("&");
        const extractedParams = {};
        rawParams.forEach((item) => {
            item = item.split(/=(.*)/s);
            extractedParams[item[0]] = item[1];
        });
        return extractedParams;
    };

    useEffect(() => {
        if (!searchParams.has("email")) {
            navigator(routes.signUp);
        }
        if (searchParams.has('token')) {
            confirmEmail(searchParams.get("email"), '123456', parseParams(location.search).token)
                .then(() => navigator(!isMobile? routes.signIn:'/m/auth/sign-in'))
                .catch(err => {
                    console.log(err)
                });
        }
    }, [searchParams])

    const inputRef = useRef(null);

    const [code, setCode] = useState('______'.slice(0, 6));

    const {sendConfirmationEmail, confirmEmail} = useAuth();

    const reSend = async () => {
        await sendConfirmationEmail({email: searchParams.get("email")});
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if (code.search(/_/g) !== -1)
            return;

        confirmEmail(searchParams.get("email"), code)
            .then(() => navigator(routes.signIn))
            .catch(err => {
                console.log(err)
            });
    }


    const onChange = (e) => {
        const {value} = e.target;

        const newValue = value.replace(/_/g, '');
        setCode(newValue.slice(0, 6));

        if (value.length === 0)
            setCode("______".slice(0, 6));
    }

    const {isMobile} = useMobileDetector();

    return (
        <React.Fragment>
            <Helmet>
                <title>Confirm email</title>
            </Helmet>
            <Show>
                <Show.When isTrue={!isMobile}>
                    <div className="flex-grow flex flex-col bg-[#E7E7E7]">
                        <div
                            className="items-center my-auto mx-auto bg-white min-w-2xl rounded-lg overflow-hidden h-fit w-[1140px]"
                            style={{boxShadow: '0px 1px 6px 0px #00000029'}}>
                            <div className="flex h-full items-center">
                                <form onSubmit={onSubmit} className="mx-auto my-12">
                                    <Logo className="fill-[#2D2A33] h-[55px] p-[5px] mx-auto"/>

                                    <h1 className="text-[#2D2A33] font-bold text-2xl text-center my-7">{t('auth.confirmEmail')}</h1>

                                    <h3 className="text-lg text-[#2D2A33]">{t('auth.enterCode')} <span
                                        className="font-bold">{searchParams.get("email")}</span></h3>

                                    {/*<div className="flex justify-center mt-2.5 mb-7">*/}
                                    {/*    <Link to={routes.signUp} className="font-semibold text-lg text-[#2D2A33]">*/}
                                    {/*        Edit email address*/}
                                    {/*    </Link>*/}
                                    {/*</div>*/}

                                    <div className="mx-auto w-[344px] relative">
                                        <input ref={inputRef} value={code} onChange={onChange} type="text" name="code"
                                               className="border-[1px] border-[#2D2A33] font-semibold rounded-xl tracking-widest w-full text-center"/>
                                    </div>

                                    <h3 className="text-sm text-[#2D2A33] text-center mt-2.5">{t('auth.noCode')}
                                        <button
                                            onClick={reSend}
                                            type="button"
                                            className="font-bold ml-2">
                                            {t('auth.resend')}
                                        </button>
                                    </h3>

                                    <div className="flex justify-center">
                                        <button type="submit"
                                                className="bg-[#24459A] w-[344px] rounded-full border-[1px] border-[#B4BFDD] mt-16 py-[10px] px-[20px] font-semibold text-base text-white">
                                            {t('auth.confirmEmailAndSignUp')}
                                        </button>
                                    </div>
                                </form>
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
                                <h1 className="text-[#585359] font-jost font-bold text-xl">{t('auth.confirmEmail')}</h1>
                            </div>
                        </div>

                        <h3 className="font-jost text-lg mt-4">
                            {t('auth.enterCode')} <span className="font-bold">{searchParams.get("email")}</span>
                        </h3>

                        <form onSubmit={onSubmit} className="mt-10">
                            <div className="mx-auto w-[344px] relative">
                                <input ref={inputRef} value={code} onChange={onChange} type="text" name="code"
                                       className="border-[1px] border-[#2D2A33] font-semibold rounded-xl tracking-widest w-full text-center"/>
                            </div>

                            <h3 className="text-sm text-[#2D2A33] text-center mt-2.5">{t('auth.noCode')}
                                <button
                                    onClick={reSend}
                                    type="button"
                                    className="font-bold ml-2">
                                    {t('auth.resend')}
                                </button>
                            </h3>

                            <div className="flex justify-center">
                                <button type="submit"
                                        className="bg-[#24459A] w-[344px] rounded-full border-[1px] border-[#B4BFDD] mt-16 py-[10px] px-[20px] font-semibold text-base text-white">
                                    {t('auth.confirmEmailAndSignUp')}
                                </button>
                            </div>
                        </form>
                    </div>
                </Show.Else>
            </Show>


        </React.Fragment>
    )
}
export default ConfirmEmail;