"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Sensor {
    constructor() {
        this.value = 0;
    }
    OnChange(callback) {
        this.onChangeCallback = callback;
    }
    OnRising(callback) {
        this.onRisingCallback = callback;
    }
    OnFalling(callback) {
        this.onFallingCallback = callback;
    }
    CallBasicEvents(stateChange) {
        if (this.onChangeCallback)
            if (stateChange.Current.Value != stateChange.Previous.Value)
                this.onChangeCallback(stateChange);
        if (this.onRisingCallback)
            if (stateChange.Current.Value > stateChange.Previous.Value)
                this.onRisingCallback(stateChange);
        if (this.onFallingCallback)
            if (stateChange.Current.Value < stateChange.Previous.Value)
                this.onFallingCallback(stateChange);
    }
    get Value() {
        return this.value;
    }
    UpdateFromHost(stateChange) {
        this.value = stateChange.Current.Value;
        this.ExecuteEvents(stateChange);
    }
}
exports.Sensor = Sensor;
//# sourceMappingURL=Sensor.js.map