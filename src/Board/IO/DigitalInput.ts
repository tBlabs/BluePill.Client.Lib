import { StateChange } from "../StateChange";
import { Sensor } from "../Sensor";
import { Addr } from "../Addr";
import { StateChangeCallback } from "../StateChangeCallback";

export interface IDigitalInput
{
    Value: number;
    OnChange(callback: StateChangeCallback): void;
    OnRising(callback: StateChangeCallback): void;
    OnFalling(callback: StateChangeCallback): void;
    OnKeyPress(callback: StateChangeCallback): void;
    OnLongKeyPress(callback: StateChangeCallback): void;
}

export class DigitalInput extends Sensor implements IDigitalInput
{
    private onKeyPressCallback?: StateChangeCallback;
    OnKeyPress(callback: StateChangeCallback): void
    {
        this.onKeyPressCallback = callback;
    }
    private onLongKeyPressCallback?: StateChangeCallback;
    OnLongKeyPress(callback: StateChangeCallback): void
    {
        this.onLongKeyPressCallback = callback;
    }
    constructor(public addr: Addr)
    {
        super();
    }

    public ExecuteEvents(stateChange: StateChange): void
    {
        this.CallBasicEvents(stateChange);

        if (this.IsPress(stateChange, 30, 500))
            if (this.onKeyPressCallback)
                this.onKeyPressCallback(stateChange);
        if (this.IsPress(stateChange, 500, 3000))
            if (this.onLongKeyPressCallback)
                this.onLongKeyPressCallback(stateChange);
    }

    private IsPress(stateChange: StateChange, min: number, max: number): boolean
    {
        if ((stateChange.Previous.Value === 1) && (stateChange.Current.Value === 0))
        {
            const timeSpan: number = stateChange.Current.Timestamp - stateChange.Previous.Timestamp;

            return (timeSpan > min) && (timeSpan <= max);
        }

        return false;
    }
}
