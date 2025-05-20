let currStepCount = 1;
let damageReportLength = 10;

export function init() {
    const nextStepButton = document.getElementById('nextStep');
    const previousStepButton = document.getElementById('previousStep');
    const currentStep = document.getElementById('activeStep');
    currentStep.textContent = `Step ${currStepCount}`;

    function updateStepDisplay() {
        currentStep.textContent = `Step ${currStepCount}`;
        previousStepButton.disabled = currStepCount === 1;
        nextStepButton.disabled = currStepCount === damageReportLength;
        loadStepContent(currStepCount);
    };

    async function loadStepContent(step) {
        try {
            const response = await fetch(`pages/filler-report/${step}.txt`);
            if (!response.ok) throw new Error('Content not found');
            const text = await response.text();
            currentStep.textContent = text;
        } catch (err) {
            currentStep.textContent = 'Error loading content';
            console.error(err);
        }
    };

    nextStepButton.onclick = (event) => {
        event.preventDefault();
        if (currStepCount < damageReportLength) {
            currStepCount++;
            updateStepDisplay();
        }
    };

    previousStepButton.onclick = (event) => {
        event.preventDefault();
        if (currStepCount > 1) {
            currStepCount--;
            updateStepDisplay();
        }
    };

    updateStepDisplay();
}