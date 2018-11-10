import { Sensor } from "./Sensor";
import { StateChange } from "../StateChange";
import { StateChangeCallback } from "../StateChangeCallback";
import { Addr } from "../Addr";

export interface IAdcInput
{
    Value: number;
    MaxValue: number;
    OnChange(callback: StateChangeCallback): void;
    OnRising(callback: StateChangeCallback): void;
    OnFalling(callback: StateChangeCallback): void;
}

export class AdcInput extends Sensor implements IAdcInput
{
    constructor(public addr: Addr)
    {
        super(addr);
    }

    public MaxValue = 409;
    
    public ExecuteEvents(stateChange: StateChange): void
    {
        this.CallBasicEvents(stateChange);
    }
}