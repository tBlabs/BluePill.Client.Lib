"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sensor_1 = require("./Sensor");
class DigitalInput extends Sensor_1.Sensor {
    constructor(addr) {
        super(addr);
        this.addr = addr;
    }
    OnKeyPress(callback) {
        this.onKeyPressCallback = callback;
    }
    OnLongKeyPress(callback) {
        this.onLongKeyPressCallback = callback;
    }
    ExecuteEvents(stateChange) {
        this.CallBasicEvents(stateChange);
        if (this.IsPress(stateChange, 30, 500))
            if (this.onKeyPressCallback)
                this.onKeyPressCallback(stateChange);
        if (this.IsPress(stateChange, 500, 3000))
            if (this.onLongKeyPressCallback)
                this.onLongKeyPressCallback(stateChange);
    }
    IsPress(stateChange, min, max) {
        if ((stateChange.Previous.Value === 1) && (stateChange.Current.Value === 0)) {
            const timeSpan = stateChange.Current.Timestamp - stateChange.Previous.Timestamp;
            return (timeSpan > min) && (timeSpan <= max);
        }
        return false;
    }
}
exports.DigitalInput = DigitalInput;
//# sourceMappingURL=DigitalInput.js.map