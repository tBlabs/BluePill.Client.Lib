"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Actuator_1 = require("./Actuator");
class Clock extends Actuator_1.Actuator {
    constructor(addr, connection) {
        super(addr, connection);
        this.addr = addr;
        this.connection = connection;
    }
    get MaxValue() {
        return 0xFFFFFFFF;
    }
}
exports.Clock = Clock;
//# sourceMappingURL=Clock.js.map