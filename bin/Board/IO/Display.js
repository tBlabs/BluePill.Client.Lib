"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IO_1 = require("./IO");
class Display extends IO_1.IO {
    constructor(valueAddr, dotAddr, connection) {
        super();
        this.valueAddr = valueAddr;
        this.dotAddr = dotAddr;
        this.connection = connection;
        this.value = 0;
        this.dot = 0;
        super.addr = [valueAddr, dotAddr];
    }
    UpdateFromHost(addr, stateChange) {
        if (addr === this.valueAddr)
            this.value = stateChange.Current.Value;
        if (addr === this.dotAddr)
            this.dot = stateChange.Current.Value;
        if (this.onValueChangeCallback)
            this.onValueChangeCallback(stateChange);
    }
    OnValueChange(callback) {
        this.onValueChangeCallback = callback;
    }
    get MaxValue() {
        return 9999;
    }
    get MaxDotValue() {
        return 4;
    }
    set Value(value) {
        if (value < 0) {
            throw new Error(`Value can not be lower than zero, but ${value} was given`);
        }
        if (value > this.MaxValue) {
            throw new Error(`Max value is ${this.MaxValue}, but ${value} was given`);
        }
        this.connection.Set(this.valueAddr, value);
    }
    get Value() {
        return this.value;
    }
    set Dot(value) {
        if (value < 0) {
            throw new Error(`Value can not be lower than zero, but ${value} was given`);
        }
        if (value > this.MaxDotValue) {
            throw new Error(`Max value is ${this.MaxDotValue}, but ${value} was given`);
        }
        this.connection.Set(this.dotAddr, value);
    }
    get Dot() {
        return this.dot;
    }
}
exports.Display = Display;
//# sourceMappingURL=Display.js.map