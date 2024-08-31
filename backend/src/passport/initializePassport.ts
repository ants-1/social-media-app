import initializeSignUp from "./strategies/initializeSignup";
import initializeLogin from "./strategies/initializeLogin";

const initializePassport = (): void => {
    initializeSignUp();
    initializeLogin();
}

export default initializePassport;