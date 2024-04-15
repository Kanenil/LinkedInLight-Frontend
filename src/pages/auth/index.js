import useMobileDetector from "../../hooks/useMobileDetector";
import React, {useEffect} from "react";
import {useNavigate} from "react-router";
import {routes} from "../../constants/routes";
import Logo from "../../elements/shared/Logo";
import {Helmet} from "react-helmet-async";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import illustration from "../../assets/login-illustration.jpg";
import {ButtonVariant1, ButtonVariant4} from "../../elements/buttons/Button";
import GoogleButton from "../../elements/buttons/GoogleButton";
import {jwtDecode} from "jwt-decode";
import {useAuth} from "../../hooks/useAuth";
import {useAuthorize} from "../../hooks/useAuthorize";

const Auth = () => {
    const {isMobile} = useMobileDetector();
    const navigator = useNavigate();
    const isAuth = useAuthorize();
    const {t} = useTranslation();
    const {googleLogin} = useAuth();

    useEffect(() => {
        if(isAuth) {
            navigator('/j4y');
        }
    }, [navigator, isAuth])

    useEffect(() => {
        if(!isMobile)
            navigator(routes.signIn);
    }, [isMobile])

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
        <React.Fragment>
            <Helmet>
                <title>Auth</title>
            </Helmet>
            <main className="flex-grow flex flex-col px-4 py-5">
                <Link to='/'>
                    <Logo className="pb-3 mr-auto fill-[#2D2A33] h-10 md:h-16"/>
                </Link>

                <div className="flex flex-col">
                    <img src={illustration} alt="illustration" />

                    <h3 className="font-jost font-medium text-center">{t('auth.illustrationText')}</h3>
                </div>

                <div className="flex flex-col gap-4 mt-10">
                    <h3 className="font-jost text-[#7D7D7D] text-sm [&>strong]:font-medium mb-4" dangerouslySetInnerHTML={{__html: t('auth.confirmText')}}/>

                    <ButtonVariant1 className="text-xl" onClick={() => navigator('sign-up')}>
                        {t('auth.confirmAndContinue')}
                    </ButtonVariant1>

                    <GoogleButton withText={true} googleLoginCallback={googleCallback}/>

                    <ButtonVariant4 onClick={() => navigator('sign-in')}>
                        {t('auth.logIn')}
                    </ButtonVariant4>
                </div>
            </main>
        </React.Fragment>
    )
}
export default Auth;