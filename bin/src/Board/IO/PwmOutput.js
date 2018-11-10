"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Actuator_1 = require("./Actuator");
class PwmOutput extends Actuator_1.Actuator {
    constructor(addr, connection) {
        super(addr, connection);
        this.addr = addr;
        this.connection = connection;
        this.MaxValue = 1024;
    }
}
exports.PwmOutput = PwmOutput;
//# sourceMappingURL=PwmOutput.js.map