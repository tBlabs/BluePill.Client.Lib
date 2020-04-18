"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Actuator_1 = require("./Actuator");
class AnalogOutput extends Actuator_1.Actuator {
    constructor(addr, connection) {
        super(addr, connection);
        this.addr = addr;
        this.connection = connection;
    }
    get MaxValue() {
        return 1024;
    }
}
exports.AnalogOutput = AnalogOutput;
//# sourceMappingURL=AnalogOutput.js.map