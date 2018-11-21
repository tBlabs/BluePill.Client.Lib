import { Sensor } from "./Sensor";
import { StateChange } from "../StateChange";
import { StateChangeCallback } from "../StateChangeCallback";
import { Addr } from "../Addr";

export interface IAnalogInput
{
    Value: number;
    MaxValue: number;
    OnChange(callback: StateChangeCallback): void;
    OnRising(callback: StateChangeCallback): void;
    OnFalling(callback: StateChangeCallback): void;
}

export class AnalogInput extends Sensor implements IAnalogInput
{
    constructor(public addr: Addr)
    {
        super(addr);
    }

    public get MaxValue(): number
    {
        return 409;
    }
    
    public ExecuteEvents(stateChange: StateChange): void
    {
        this.CallBasicEvents(stateChange);
    }
}
