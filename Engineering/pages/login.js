import { isLoggedIn, setLoggedIn } from '../index.js';
import { updateDisabledButtons } from '../index.js';
import { officerLogin, setOfficerLogin } from '../index.js';

export function init() {
    const loginButton = document.getElementById('loginButton');
    const officerLoginInput = document.getElementById('officerLogin');
    loginButton.onclick = (event) => {
        event.preventDefault();
        setLoggedIn(true);
        updateDisabledButtons();
        setOfficerLogin(officerLoginInput.value);

        const welcomeMessage = document.getElementById('welcomeMessage');
        welcomeMessage.textContent = `Welcome, ${officerLoginInput.value}`;
    };

    if (isLoggedIn) {
        const welcomeMessage = document.getElementById('welcomeMessage');
        welcomeMessage.textContent = `Welcome, ${officerLogin}`;
    }
}