export function init() {
    let currStepCount = 1;
    let damageReportLength = 10;
    const nextStepButton = document.getElementById('nextStep');
    const previousStepButton = document.getElementById('previousStep');
    const currentStep = document.getElementById('activeStep');
    currentStep.textContent = `Step ${currStepCount}`;

    nextStepButton.onclick = (event) => {
        event.preventDefault();
        currStepCount++;
        const currentStep = document.getElementById('activeStep');
        currentStep.textContent = `Step ${currStepCount}`;
        if (currStepCount === damageReportLength) {
            nextStepButton.disabled = true;
        } else if (currStepCount > 1) {
            previousStepButton.disabled = false;
        }
    }

    previousStepButton.onclick = (event) => {
        event.preventDefault();
        currStepCount--;
        const currentStep = document.getElementById('activeStep');
        currentStep.textContent = `Step ${currStepCount}`;
        if (currStepCount === 1) {
            previousStepButton.disabled = true;
        } else if (currStepCount < damageReportLength) {
            nextStepButton.disabled = false;
        }
    }
}