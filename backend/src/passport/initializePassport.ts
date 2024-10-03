import initializeSignUp from "./strategies/initializeSignup";
import initializeLogin from "./strategies/initializeLogin";
import initializeGoogleLogin from "./strategies/initializeGoogle";

const initializePassport = (): void => {
    initializeSignUp();
    initializeLogin();
    initializeGoogleLogin();
}

export default initializePassport;