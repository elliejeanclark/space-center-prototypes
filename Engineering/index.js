import {
    startChronometer,
    stopChronometer,
    resetChronometer,
    getChronometerTime
} from './chronometer.js';

let chronoRunning = false;

export let isLoggedIn = false;
export let officerLogin = "";

export function setLoggedIn(value) {
    isLoggedIn = value;
}

export function setOfficerLogin(value) {
    officerLogin = value;
}

export function updateDisabledButtons() {
    const buttons = document.querySelectorAll('nav button');
    buttons.forEach(button => {
        button.disabled = !isLoggedIn;
    });
}

const pagesWithJs = new Set(['login.html', 'damage-reports.html', 'teams.html']);

const chronoDisplay = document.getElementById('chronometer');
const chronoResetButton = document.getElementById('resetChronometer');
const chronoStopButton = document.getElementById('stopChronometer');

function handleChronoTick(currentTime) {
    chronoDisplay.textContent = `Chronometer: ${currentTime} seconds`;
}

chronoResetButton.addEventListener('click', (event) => {
    event.preventDefault();
    resetChronometer();
    startChronometer(handleChronoTick);
    chronoStopButton.disabled = false;
});

chronoStopButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (chronoRunning) {
        stopChronometer();
        chronoStopButton.innerText = 'Resume';
        chronoRunning = false;
    } else {
        startChronometer(handleChronoTick);
        chronoStopButton.innerText = 'Stop';
        chronoRunning = true;
    }
});

window.addEventListener('load', () => {
    startChronometer(handleChronoTick);
    chronoRunning = true;
});

document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');
    const loadedCss = new Set();

    async function loadPage(page) {
        try {
            const response = await fetch(`pages/${page}`);
            if (!response.ok) throw new Error('Page not found');
            const html = await response.text();
            contentDiv.innerHTML = html;

            const cssHref = `pages/${page.replace('.html', '.css')}`;
            if (!loadedCss.has(cssHref)) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = cssHref;
                document.head.appendChild(link);
                loadedCss.add(cssHref);
            }

            if (pagesWithJs.has(page) && page !== 'index.html') {
                try {
                    const pageModule = await import(`./pages/${page.replace('.html', '.js')}`);
                    if (typeof pageModule.init === 'function') {
                        pageModule.init();
                    }
                } catch (e) {
                    console.warn(`Failed to load JS for ${page}:`, e);
                }
            }
        } catch (e) {
            contentDiv.innerHTML = `<p>Error loading page.</p>`;
            console.error(e);
        }
    }

    loadPage('login.html');

    document.querySelectorAll('nav button[data-page]').forEach(button => {
        button.addEventListener('click', () => {
            const page = button.getAttribute('data-page');
            loadPage(page);
            button.disabled = !isLoggedIn;
        });
    });
});
