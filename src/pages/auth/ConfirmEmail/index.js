import Logo from "../../../elements/shared/Logo";
import {useSearchParams} from "react-router-dom";
import {routes} from "../../../constants/routes";
import React, {useEffect, useRef, useState} from "react";
import {useAuth} from "../../../hooks/auth";
import {useLocation, useNavigate} from "react-router";
import {Helmet} from "react-helmet-async";

const ConfirmEmail = () => {
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

    useEffect( () => {
        if(!searchParams.has("email")) {
            navigator(routes.signUp);
        }
        if(searchParams.has('token')) {
            confirmEmail(searchParams.get("email"), '', parseParams(location.search).token)
                .then(() => navigator(routes.signIn))
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

    return (
        <React.Fragment>
            <Helmet>
                <title>Confirm email</title>
            </Helmet>
            <div className="flex-grow flex flex-col bg-[#E7E7E7]">
                <div
                    className="items-center my-auto mx-auto bg-white min-w-2xl rounded-lg overflow-hidden h-fit w-[1140px]"
                    style={{boxShadow: '0px 1px 6px 0px #00000029'}}>
                    <div className="flex h-full items-center">
                        <form onSubmit={onSubmit} className="mx-auto my-12">
                            <Logo className="fill-[#2D2A33] h-[55px] p-[5px] mx-auto"/>

                            <h1 className="text-[#2D2A33] font-bold text-2xl text-center my-7">Confirm your email
                                address</h1>

                            <h3 className="text-lg text-[#2D2A33]">Enter the code we sent to your email address <span
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

                            <h3 className="text-sm text-[#2D2A33] text-center mt-2.5">Haven't received the code? <button
                                onClick={reSend}
                                type="button"
                                className="font-bold ml-2">Resend it</button>
                            </h3>

                            <div className="flex justify-center">
                                <button type="submit"
                                        className="bg-[#24459A] w-[344px] rounded-full border-[1px] border-[#B4BFDD] mt-16 py-[10px] px-[20px] font-semibold text-base text-white">
                                    Confirm and Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default ConfirmEmail;