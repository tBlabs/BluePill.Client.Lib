import { StateChange } from "../StateChange";
import { StateChangeCallback } from "../StateChangeCallback";
import { IO } from "./IO";
import { Addr } from "../Addr";
export declare abstract class Sensor extends IO {
    addr: Addr;
    constructor(addr: Addr);
    private onChangeCallback?;
    private onRisingCallback?;
    private onFallingCallback?;
    OnChange(callback: StateChangeCallback): void;
    OnRising(callback: StateChangeCallback): void;
    OnFalling(callback: StateChangeCallback): void;
    protected CallBasicEvents(stateChange: StateChange): void;
    private value;
    readonly Value: number;
    UpdateFromHost(addr: Addr, stateChange: StateChange): void;
    abstract ExecuteEvents(stateChange: StateChange): void;
}
