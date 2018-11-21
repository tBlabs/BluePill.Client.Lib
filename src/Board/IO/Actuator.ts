import { StateChangeCallback } from "../StateChangeCallback";
import { IBoardConnector } from "../../Connectors/IBoardConnector";
import { StateChange } from "../StateChange";
import { IO } from "./IO";
import { Addr } from "../Addr";

export abstract class Actuator extends IO
{
    private onChangeCallback?: StateChangeCallback;

    public OnChange(callback: StateChangeCallback): void
    {
        this.onChangeCallback = callback;
    }

    constructor(
        public addr: number,
        private connector: IBoardConnector)
    {
        super();
    }

    private value: number = 0;

    public set Value(value: number)
    {
        if (value < 0)
        {
            throw new Error(`Value can not be lower than zero, but ${ value } was given`);
        }

        if (value > this.MaxValue)
        {
            throw new Error(`Max value is ${ this.MaxValue }, but ${ value } was given`);
        }

        this.connector.Set(this.addr, value);
    }

    public get Value(): number
    {
        return this.value;
    }

    public UpdateFromHost(addr: Addr, stateChange: StateChange): void
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
