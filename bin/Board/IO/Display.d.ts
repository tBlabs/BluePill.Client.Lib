import { StateChangeCallback } from "../StateChangeCallback";
import { Addr } from "../Addr";
import { IBoardConnector } from "../../Connectors/IBoardConnector";
import { IO } from "./IO";
import { StateChange } from "../StateChange";
export interface IDisplay {
    Value: number;
    Dot: number;
    MaxValue: number;
    MaxDotValue: number;
    OnValueChange(callback: StateChangeCallback): void;
}
export declare class Display extends IO implements IDisplay {
    valueAddr: any;
    dotAddr: any;
    private connection;
    UpdateFromHost(addr: Addr, stateChange: StateChange): void;
    private onValueChangeCallback?;
    OnValueChange(callback: StateChangeCallback): void;
    get MaxValue(): number;
    get MaxDotValue(): number;
    private value;
    private dot;
    constructor(valueAddr: any, dotAddr: any, connection: IBoardConnector);
    set Value(value: number);
    get Value(): number;
    set Dot(value: number);
    get Dot(): number;
}
