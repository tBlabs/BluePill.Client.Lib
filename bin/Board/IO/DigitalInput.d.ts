import { StateChange } from "../StateChange";
import { Sensor } from "./Sensor";
import { Addr } from "../Addr";
import { StateChangeCallback } from "../StateChangeCallback";
export interface IDigitalInput {
    Value: number;
    OnChange(callback: StateChangeCallback): void;
    OnRising(callback: StateChangeCallback): void;
    OnFalling(callback: StateChangeCallback): void;
    OnKeyPress(callback: StateChangeCallback): void;
    OnLongKeyPress(callback: StateChangeCallback): void;
}
export declare class DigitalInput extends Sensor implements IDigitalInput {
    addr: Addr;
    private onKeyPressCallback?;
    private onLongKeyPressCallback?;
    OnKeyPress(callback: StateChangeCallback): void;
    OnLongKeyPress(callback: StateChangeCallback): void;
    constructor(addr: Addr);
    get MaxValue(): number;
    ExecuteEvents(stateChange: StateChange): void;
    private IsPress;
}
