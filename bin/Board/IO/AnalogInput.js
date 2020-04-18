"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sensor_1 = require("./Sensor");
class AnalogInput extends Sensor_1.Sensor {
    constructor(addr) {
        super(addr);
        this.addr = addr;
    }
    get MaxValue() {
        return 409;
    }
    ExecuteEvents(stateChange) {
        this.CallBasicEvents(stateChange);
    }
}
exports.AnalogInput = AnalogInput;
//# sourceMappingURL=AnalogInput.js.map