"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DigitalOutput_1 = require("./IO/DigitalOutput");
const DigitalInput_1 = require("./IO/DigitalInput");
const Sensor_1 = require("./Sensor");
const Addr_1 = require("./Addr");
const Actuator_1 = require("./Actuator");
class Board {
    constructor(conn) {
        this.Input1 = new DigitalInput_1.DigitalInput(Addr_1.Addr.Input1);
        this.Input2 = new DigitalInput_1.DigitalInput(Addr_1.Addr.Input2);
        this.Input3 = new DigitalInput_1.DigitalInput(Addr_1.Addr.Input3);
        this.Input4 = new DigitalInput_1.DigitalInput(Addr_1.Addr.Input4);
        this.Input5 = new DigitalInput_1.DigitalInput(Addr_1.Addr.Input5);
        this.Input6 = new DigitalInput_1.DigitalInput(Addr_1.Addr.Input6);
        this.Input7 = new DigitalInput_1.DigitalInput(Addr_1.Addr.Input7);
        this.Output1 = new DigitalOutput_1.DigitalOutput(Addr_1.Addr.Output1, conn);
        this.Output2 = new DigitalOutput_1.DigitalOutput(Addr_1.Addr.Output2, conn);
        this.Output3 = new DigitalOutput_1.DigitalOutput(Addr_1.Addr.Output3, conn);
        this.Output4 = new DigitalOutput_1.DigitalOutput(Addr_1.Addr.Output4, conn);
        this.Output5 = new DigitalOutput_1.DigitalOutput(Addr_1.Addr.Output5, conn);
        this.Output6 = new DigitalOutput_1.DigitalOutput(Addr_1.Addr.Output6, conn);
        this.Output7 = new DigitalOutput_1.DigitalOutput(Addr_1.Addr.Output7, conn);
        this.Output33 = new DigitalOutput_1.DigitalOutput(Addr_1.Addr.RTC, conn);
        conn.OnUpdate = (addr, stateChange) => {
            try {
                const io = this.IoByAddr(addr);
                io.UpdateFromHost(stateChange);
            }
            catch (error) {
                console.log('IO not implemented yet');
            }
        };
    }
    IoByAddr(addr) {
        const allIoNames = Object.keys(this);
        const ios = allIoNames.filter(io => this[io] instanceof Sensor_1.Sensor || (this[io] instanceof Actuator_1.Actuator));
        const io = ios.find(ioName => this[ioName].addr === addr);
        if (io === undefined) {
            throw new Error(`IO ${addr} not found`);
        }
        return this[io];
    }
}
exports.Board = Board;
//# sourceMappingURL=Board.js.map