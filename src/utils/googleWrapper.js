export const createGoogleWrapper = () => {
    if(document.getElementById("google-login") === null) {
        const googleLoginWrapper = document.createElement("div");

        googleLoginWrapper.style.display = "none";
        googleLoginWrapper.id = "google-login";

        document.body.appendChild(googleLoginWrapper);

        window.google.accounts.id.renderButton(googleLoginWrapper, {
            type: "icon",
            width: "200",
        });
    }

    const googleLoginWrapperButton =
        document.getElementById('google-login').querySelector("div[role=button]");

    return {
        click: () => {
            googleLoginWrapperButton.click();
        },
    };
}