import { StateChange } from "../StateChange";
import { StateChangeCallback } from "../StateChangeCallback";
import { IO } from "./IO";
import { Addr } from "../Addr";

export abstract class Sensor extends IO
{
    constructor(public addr: Addr)
    { 
        super();
    }
    
    private onChangeCallback?: StateChangeCallback;
    private onRisingCallback?: StateChangeCallback;
    private onFallingCallback?: StateChangeCallback;

    public OnChange(callback: StateChangeCallback): void
    {
        this.onChangeCallback = callback;
    }

    public OnRising(callback: StateChangeCallback): void
    {
        this.onRisingCallback = callback;
    }
    
    public OnFalling(callback: StateChangeCallback): void
    {
        this.onFallingCallback = callback;
    }

    protected CallBasicEvents(stateChange: StateChange): void
    {
        if (this.onChangeCallback)
            if (stateChange.Current.Value != stateChange.Previous.Value)
                this.onChangeCallback(stateChange);

        if (this.onRisingCallback)
            if (stateChange.Current.Value > stateChange.Previous.Value)
                this.onRisingCallback(stateChange);

        if (this.onFallingCallback)
            if (stateChange.Current.Value < stateChange.Previous.Value)
                this.onFallingCallback(stateChange);
    }
    
    private value: number = 0;

    public get Value(): number
    {
        return this.value;
    }

    public UpdateFromHost(addr: Addr, stateChange: StateChange): void
    {
      //  console.log('UPDATE', addr, stateChange);
        this.value = stateChange.Current.Value;

        this.ExecuteEvents(stateChange);
    }

    public abstract ExecuteEvents(stateChange: StateChange): void;
}
