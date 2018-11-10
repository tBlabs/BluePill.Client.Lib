import { StateChangeCallback } from "../StateChangeCallback";
import { Addr } from "../Addr";
import { IBoardConnector } from "../../Connectors/IBoardConnector";
import { IO } from "./IO";
import { StateChange } from "../StateChange";

export interface IDisplay
{
    Value: number;
    Dot: number;
    MaxValue: number;
    MaxDotValue: number;
    OnValueChange(callback: StateChangeCallback): void;
}

export class Display extends IO implements IDisplay
{
    UpdateFromHost(addr: Addr, stateChange: StateChange): void
    {
        if (addr === this.valueAddr) this.value = stateChange.Current.Value;
        if (addr === this.dotAddr) this.dot = stateChange.Current.Value;

        if (this.onValueChangeCallback)
            this.onValueChangeCallback(stateChange);
    }

    private onValueChangeCallback?: StateChangeCallback;
    OnValueChange(callback: StateChangeCallback): void
    {
        this.onValueChangeCallback = callback;
    }

    public MaxValue: number = 9999;
    public MaxDotValue: number = 4;

    private value: number = 0;
    private dot: number = 0;

    constructor(
        public valueAddr,
        public dotAddr,
        private connection: IBoardConnector)
    {
        super();

        super.addr = [valueAddr, dotAddr];
    }

    public set Value(value: number)
    {
        this.connection.Set(this.valueAddr, value);
    }

    public get Value(): number
    {
        return this.value;
    }

    public set Dot(dot: number)
    {
        this.connection.Set(this.dotAddr, dot);
    }

    public get Dot(): number
    {
        return this.dot;
    }
}