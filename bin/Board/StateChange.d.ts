export declare class Measurement {
    Value: number;
    Timestamp: number;
    constructor(Value: number, Timestamp: number);
}
export declare class StateChange {
    Current: Measurement;
    Previous: Measurement;
    constructor(Current: Measurement, Previous: Measurement);
}
