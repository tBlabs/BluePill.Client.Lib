"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Measurement {
    constructor(Value, Timestamp) {
        this.Value = Value;
        this.Timestamp = Timestamp;
    }
}
exports.Measurement = Measurement;
class StateChange {
    constructor(Current, Previous) {
        this.Current = Current;
        this.Previous = Previous;
    }
}
exports.StateChange = StateChange;
//# sourceMappingURL=StateChange.js.map