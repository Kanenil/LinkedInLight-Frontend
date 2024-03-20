import Logo from "../../../elements/shared/Logo";
import {Link} from "react-router-dom";
import {routes} from "../../../constants/routes";
import React, {useEffect, useRef, useState} from "react";
import {useAuth} from "../../../hooks/auth";
import {useNavigate} from "react-router";
import hash from "../../../utils/hash";
import {general} from "../../../constants/general";
import {Helmet} from "react-helmet-async";

const ConfirmEmail = () => {
    const navigator = useNavigate();

    const user = JSON.parse(localStorage.getItem(general.user) || '{}');

    const inputRef = useRef(null);

    const [code, setCode] = useState('______'.slice(0, 6));

    const {sendConfirmationEmail, register} = useAuth();

    useEffect(() => {
        if(!localStorage.getItem(general.user) || !localStorage.getItem(general.code)) {
            navigator(routes.signUp)
        }
    }, [navigator])

    const reSend = () => {
        if (user?.email?.length < 0)
            navigator(routes.signUp)

        sendConfirmationEmail({...user}).then();
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if (code.search(/_/g) !== -1)
            return;

        const hashedCode = await hash(code);

        if (hashedCode !== localStorage.getItem(general.code)) return;

        const model = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password,
            country: user.country,
            city: user.city
        }

        console.log(model)

        localStorage.removeItem(general.code);
        localStorage.removeItem(general.user);

        await register({...model});
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
                                className="font-bold">{user.email}</span></h3>

                            <div className="flex justify-center mt-2.5 mb-7">
                                <Link to={routes.signUp} className="font-semibold text-lg text-[#2D2A33]">
                                    Edit email address
                                </Link>
                            </div>

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