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
    public UpdateFromHost(addr: Addr, stateChange: StateChange): void
    {
        if (addr === this.valueAddr) this.value = stateChange.Current.Value;
        if (addr === this.dotAddr) this.dot = stateChange.Current.Value;

        if (this.onValueChangeCallback)
            this.onValueChangeCallback(stateChange);
    }

    private onValueChangeCallback?: StateChangeCallback;

    public OnValueChange(callback: StateChangeCallback): void
    {
        this.onValueChangeCallback = callback;
    }

    public get MaxValue(): number 
    {
        return 9999;
    }

    public get MaxDotValue(): number
    {
        return 4;
    }

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
        if (value < 0)
        {
            throw new Error(`Value can not be lower than zero, but ${ value } was given`);
        }

        if (value > this.MaxValue)
        {
            throw new Error(`Max value is ${ this.MaxValue }, but ${ value } was given`);
        }

        this.connection.Set(this.valueAddr, value);
    }

    public get Value(): number
    {
        return this.value;
    }

    public set Dot(value: number)
    {
        if (value < 0)
        {
            throw new Error(`Value can not be lower than zero, but ${ value } was given`);
        }

        if (value > this.MaxDotValue)
        {
            throw new Error(`Max value is ${ this.MaxDotValue }, but ${ value } was given`);
        }

        this.connection.Set(this.dotAddr, value);
    }

    public get Dot(): number
    {
        return this.dot;
    }
}
