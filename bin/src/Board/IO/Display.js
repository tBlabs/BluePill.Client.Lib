"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IO_1 = require("./IO");
class Display extends IO_1.IO {
    constructor(valueAddr, dotAddr, connection) {
        super();
        this.valueAddr = valueAddr;
        this.dotAddr = dotAddr;
        this.connection = connection;
        this.MaxValue = 9999;
        this.MaxDotValue = 4;
        this.value = 0;
        this.dot = 0;
        super.addr = [valueAddr, dotAddr];
    }
    UpdateFromHost(addr, stateChange) {
        if (addr === this.valueAddr)
            this.value = stateChange.Current.Value;
        if (addr === this.dotAddr)
            this.dot = stateChange.Current.Value;
    }
    OnValueChange(callback) {
        throw new Error("Method not implemented.");
    }
    set Value(value) {
        this.connection.Set(this.valueAddr, value);
    }
    get Value() {
        return this.value;
    }
    set Dot(dot) {
        this.connection.Set(this.dotAddr, dot);
    }
    get Dot() {
        return this.dot;
    }
}
exports.Display = Display;
//# sourceMappingURL=Display.js.map