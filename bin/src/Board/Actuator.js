"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Actuator {
    constructor(addr, connector) {
        this.addr = addr;
        this.connector = connector;
        this.value = 0;
    }
    OnChange(callback) {
        this.onChangeCallback = callback;
    }
    set Value(value) {
        this.connector.Set(this.addr, value);
    }
    get Value() {
        return this.value;
    }
    UpdateFromHost(stateChange) {
        this.value = stateChange.Current.Value;
        this.ExecuteEvents(stateChange);
    }
    ExecuteEvents(stateChange) {
        if (this.onChangeCallback)
            if (stateChange.Current.Value != stateChange.Previous.Value)
                this.onChangeCallback(stateChange);
    }
}
exports.Actuator = Actuator;
//# sourceMappingURL=Actuator.js.map