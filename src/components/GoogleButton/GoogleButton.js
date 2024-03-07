import GoogleIcon from "../../elements/GoogleIcon/GoogleIcon";
import {createGoogleWrapper} from "../../utils/googleWrapper";
import {APP_ENV} from "../../env";

const GoogleButton = ({title = 'Sign in with Google', googleLoginCallback, ...props}) => {
    window.google.accounts.id.initialize({
        client_id: APP_ENV.GOOGLE_CLIENT_ID,
        ux_mode: "popup",
        callback: googleLoginCallback,
    });

    const googleWrapper = createGoogleWrapper();

    return (
        <button onClick={() => googleWrapper.click()}
                className="w-full flex items-center justify-center p-3 bg-white text-[#959cb1] hover:text-[#4a6cf7] text-base font-medium rounded-md shadow-one mb-6"
                {...props}>
            <span className="mr-3">
                <GoogleIcon/>
            </span>
            {title}
        </button>
    )
}
export default GoogleButton;