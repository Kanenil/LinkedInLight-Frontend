import {createGoogleWrapper} from "../../utils/googleWrapper";
import {APP_ENV} from "../../env";

const GoogleIcon = ({className}) => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 14">
            <path d="M8.2 6.3V8.05H12.33C11.91 10.5 9.95 12.25 7.5 12.25C4.63 12.25 2.25 9.87 2.25 7C2.25 4.13 4.63 1.75 7.5 1.75C8.97 1.75 10.23 2.38 11.14 3.36L12.4 2.1C11.14 0.84 9.46 0 7.5 0C3.65 0 0.5 3.15 0.5 7C0.5 10.85 3.65 14 7.5 14C11.35 14 14.15 10.85 14.15 7V6.3H8.2Z" />
        </svg>
    )
}

const GoogleButton = ({googleLoginCallback, ...props}) => {
    window.google.accounts.id.initialize({
        client_id: APP_ENV.GOOGLE_CLIENT_ID, ux_mode: "popup", callback: googleLoginCallback,
    });

    const googleWrapper = createGoogleWrapper();

    return (
        <button type="button" onClick={() => googleWrapper.click()}
                className="rounded-full border-[1px] border-[#2D2A33] p-1"
                {...props}>
            <GoogleIcon className="fill-[#2D2A33] h-[16px]"/>
        </button>
    )
}
export default GoogleButton;