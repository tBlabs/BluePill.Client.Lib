import { StateChangeCallback } from "../StateChangeCallback";
import { Addr } from "../Addr";
import { IBoardConnector } from "../../Connectors/IBoardConnector";
import { Actuator } from "./Actuator";
export interface IPwmOutput {
    Value: number;
    MaxValue: number;
    OnChange(callback: StateChangeCallback): void;
}
export declare class PwmOutput extends Actuator implements IPwmOutput {
    addr: Addr;
    private connection;
    constructor(addr: Addr, connection: IBoardConnector);
    readonly MaxValue: number;
}
