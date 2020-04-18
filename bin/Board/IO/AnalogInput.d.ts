import { Sensor } from "./Sensor";
import { StateChange } from "../StateChange";
import { StateChangeCallback } from "../StateChangeCallback";
import { Addr } from "../Addr";
export interface IAnalogInput {
    Value: number;
    MaxValue: number;
    OnChange(callback: StateChangeCallback): void;
    OnRising(callback: StateChangeCallback): void;
    OnFalling(callback: StateChangeCallback): void;
}
export declare class AnalogInput extends Sensor implements IAnalogInput {
    addr: Addr;
    constructor(addr: Addr);
    get MaxValue(): number;
    ExecuteEvents(stateChange: StateChange): void;
}
