import { Sensor } from "./Sensor";
import { StateChange } from "../StateChange";
import { StateChangeCallback } from "../StateChangeCallback";
import { Addr } from "../Addr";
export interface IAdcInput {
    Value: number;
    MaxValue: number;
    OnChange(callback: StateChangeCallback): void;
    OnRising(callback: StateChangeCallback): void;
    OnFalling(callback: StateChangeCallback): void;
}
export declare class AdcInput extends Sensor implements IAdcInput {
    addr: Addr;
    constructor(addr: Addr);
    readonly MaxValue: number;
    ExecuteEvents(stateChange: StateChange): void;
}
