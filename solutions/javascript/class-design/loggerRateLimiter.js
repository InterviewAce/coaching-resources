const COOLDOWN_PERIOD_LENGTH = 10;

class Logger {
    constructor() {
        this.lastPrintTime = {};
    }

    shouldPrintMessage(timestamp, message) {
        const messagePreviouslyPrinted =
            this.lastPrintTime.hasOwnProperty(message);

        if (!messagePreviouslyPrinted) {
            this.lastPrintTime[message] = timestamp;
            return true;
        }

        const timeSinceLastPrint = timestamp - this.lastPrintTime[message];
        if (timeSinceLastPrint < COOLDOWN_PERIOD_LENGTH) return false;

        this.lastPrintTime[message] = timestamp;
        return true;
    }
}
