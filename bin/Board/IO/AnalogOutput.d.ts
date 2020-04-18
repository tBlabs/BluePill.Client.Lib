import { StateChangeCallback } from "../StateChangeCallback";
import { Addr } from "../Addr";
import { IBoardConnector } from "../../Connectors/IBoardConnector";
import { Actuator } from "./Actuator";
export interface IAnalogOutput {
    Value: number;
    MaxValue: number;
    OnChange(callback: StateChangeCallback): void;
}
export declare class AnalogOutput extends Actuator implements IAnalogOutput {
    addr: Addr;
    private connection;
    constructor(addr: Addr, connection: IBoardConnector);
    get MaxValue(): number;
}
