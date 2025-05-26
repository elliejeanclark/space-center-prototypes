let chronoTime = 0;
let chronoInterval = null;

export function startChronometer() {
    if (chronoInterval === null) {
        chronoInterval = setInterval(() => {
            chronoTime++;
            console.log(`Chronometer time: ${chronoTime} seconds`);
        }, 1000);
    }
}

export function stopChronometer() {
    if (chronoInterval !== null) {
        clearInterval(chronoInterval);
        chronoInterval = null;
    }
}

export function resetChronometer() {
    stopChronometer();
    chronoTime = 0;
}

export function getChronometerTime() {
    return chronoTime;
}