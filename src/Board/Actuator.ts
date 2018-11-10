import { StateChange } from "./StateChange";
import { StateChangeCallback } from "./StateChangeCallback";
import { IBoardConnector } from "../Connectors/IBoardConnector";

export abstract class Actuator
{
    private onChangeCallback?: StateChangeCallback;

    public OnChange(callback: StateChangeCallback): void
    {
        this.onChangeCallback = callback;
    }

    constructor(
        protected addr: number,
        private connector: IBoardConnector)
    { }

    private value: number = 0;

    public set Value(value: number)
    {
        this.connector.Set(this.addr, value);
    }

    public get Value(): number
    {
        return this.value;
    }

    public UpdateFromHost(stateChange: StateChange): void
    {
        this.value = stateChange.Current.Value;

        this.ExecuteEvents(stateChange);
    }

    public ExecuteEvents(stateChange: StateChange): void
    {
        if (this.onChangeCallback)
            if (stateChange.Current.Value != stateChange.Previous.Value)
                this.onChangeCallback(stateChange);
    }
}
