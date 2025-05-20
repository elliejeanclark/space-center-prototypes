import { setLoggedIn } from '../index.js';

export function init() {
    const loginButton = document.getElementById('loginButton');
    loginButton.onclick = (event) => {
        event.preventDefault();
        setLoggedIn(true);
        console.log('User logged in');
    };
}