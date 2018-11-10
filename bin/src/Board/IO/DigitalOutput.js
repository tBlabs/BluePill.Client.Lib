"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Actuator_1 = require("../Actuator");
class DigitalOutput extends Actuator_1.Actuator {
    constructor(addr, connection) {
        super(addr, connection);
        this.addr = addr;
        this.connection = connection;
    }
    On() {
        this.connection.Set(this.addr, 1);
    }
    Off() {
        this.connection.Set(this.addr, 0);
    }
    Toggle() {
        this.connection.Set(this.addr, 1 - this.Value);
    }
}
exports.DigitalOutput = DigitalOutput;
//# sourceMappingURL=DigitalOutput.js.map