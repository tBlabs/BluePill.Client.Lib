"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sensor_1 = require("./Sensor");
class AdcInput extends Sensor_1.Sensor {
    constructor(addr) {
        super(addr);
        this.addr = addr;
        this.MaxValue = 409;
    }
    ExecuteEvents(stateChange) {
        this.CallBasicEvents(stateChange);
    }
}
exports.AdcInput = AdcInput;
//# sourceMappingURL=AdcInput.js.map