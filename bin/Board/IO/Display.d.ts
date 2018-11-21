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
    readonly MaxValue: number;
    readonly MaxDotValue: number;
    private value;
    private dot;
    constructor(valueAddr: any, dotAddr: any, connection: IBoardConnector);
    Value: number;
    Dot: number;
}
