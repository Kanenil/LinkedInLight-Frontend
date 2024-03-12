import GoogleIcon from "../../elements/GoogleIcon/GoogleIcon";
import {createGoogleWrapper} from "../../utils/googleWrapper";
import {APP_ENV} from "../../env";

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