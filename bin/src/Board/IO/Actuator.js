"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IO_1 = require("./IO");
class Actuator extends IO_1.IO {
    constructor(addr, connector) {
        super();
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
    UpdateFromHost(addr, stateChange) {
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