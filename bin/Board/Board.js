"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DigitalInput_1 = require("./IO/DigitalInput");
const DigitalOutput_1 = require("./IO/DigitalOutput");
const AnalogInput_1 = require("./IO/AnalogInput");
const AnalogOutput_1 = require("./IO/AnalogOutput");
const Display_1 = require("./IO/Display");
const Addr_1 = require("./Addr");
const IO_1 = require("./IO/IO");
const Clock_1 = require("./IO/Clock");
class Board {
    constructor(connector) {
        this.Input1 = new DigitalInput_1.DigitalInput(Addr_1.Addr.Input1);
        this.Input2 = new DigitalInput_1.DigitalInput(Addr_1.Addr.Input2);
        this.Input3 = new DigitalInput_1.DigitalInput(Addr_1.Addr.Input3);
        this.Input4 = new DigitalInput_1.DigitalInput(Addr_1.Addr.Input4);
        this.Input5 = new DigitalInput_1.DigitalInput(Addr_1.Addr.Input5);
        this.Input6 = new DigitalInput_1.DigitalInput(Addr_1.Addr.Input6);
        this.Input7 = new DigitalInput_1.DigitalInput(Addr_1.Addr.Input7);
        this.Adc1 = new AnalogInput_1.AnalogInput(Addr_1.Addr.Adc1);
        this.Adc2 = new AnalogInput_1.AnalogInput(Addr_1.Addr.Adc2);
        this.Adc3 = new AnalogInput_1.AnalogInput(Addr_1.Addr.Adc3);
        this.Adc4 = new AnalogInput_1.AnalogInput(Addr_1.Addr.Adc4);
        this.Output1 = new DigitalOutput_1.DigitalOutput(Addr_1.Addr.Output1, connector);
        this.Output2 = new DigitalOutput_1.DigitalOutput(Addr_1.Addr.Output2, connector);
        this.Output3 = new DigitalOutput_1.DigitalOutput(Addr_1.Addr.Output3, connector);
        this.Output4 = new DigitalOutput_1.DigitalOutput(Addr_1.Addr.Output4, connector);
        this.Output5 = new DigitalOutput_1.DigitalOutput(Addr_1.Addr.Output5, connector);
        this.Output6 = new DigitalOutput_1.DigitalOutput(Addr_1.Addr.Output6, connector);
        this.Output7 = new DigitalOutput_1.DigitalOutput(Addr_1.Addr.Output7, connector);
        this.Pwm1 = new AnalogOutput_1.AnalogOutput(Addr_1.Addr.Pwm1, connector);
        this.Pwm2 = new AnalogOutput_1.AnalogOutput(Addr_1.Addr.Pwm2, connector);
        this.Pwm3 = new AnalogOutput_1.AnalogOutput(Addr_1.Addr.Pwm3, connector);
        this.Pwm4 = new AnalogOutput_1.AnalogOutput(Addr_1.Addr.Pwm4, connector);
        this.Clock1 = new Clock_1.Clock(Addr_1.Addr.RTC, connector);
        this.Display1 = new Display_1.Display(Addr_1.Addr.Display1, Addr_1.Addr.Display1Dot, connector);
        connector.OnUpdate = (addr, stateChange) => {
            try {
                const io = this.IoByAddr(addr);
                io.UpdateFromHost(addr, stateChange);
            }
            catch (error) {
                console.log(`IO ${addr} not implemented yet?`);
            }
        };
    }
    IoByAddr(addr) {
        const thisClassPropsNames = Object.keys(this);
        const iosNames = thisClassPropsNames.filter(io => this[io] instanceof IO_1.IO);
        const ioName = iosNames.find(ioName => {
            const io = this[ioName];
            if (Array.isArray(io.addr)) {
                return io.addr.includes(addr);
            }
            else {
                return (io.addr === addr);
            }
        });
        if (ioName === undefined) {
            throw new Error(`IO ${addr} not found`);
        }
        return this[ioName];
    }
}
exports.Board = Board;
//# sourceMappingURL=Board.js.map