export const createGoogleWrapper = () => {
    const googleLoginWrapper = document.createElement("div");

    googleLoginWrapper.style.display = "none";
    googleLoginWrapper.id = "google-login";

    document.body.appendChild(googleLoginWrapper);

    window.google.accounts.id.renderButton(googleLoginWrapper, {
        type: "icon",
        width: "200",
    });

    const googleLoginWrapperButton =
        googleLoginWrapper.querySelector("div[role=button]");

    return {
        click: () => {
            googleLoginWrapperButton.click();
        },
    };
}