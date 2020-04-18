import { StateChangeCallback } from "../StateChangeCallback";
import { Addr } from "../Addr";
import { IBoardConnector } from "../../Connectors/IBoardConnector";
import { Actuator } from "./Actuator";
export interface IClock {
    Value: number;
    MaxValue: number;
    OnChange(callback: StateChangeCallback): void;
}
export declare class Clock extends Actuator implements IClock {
    addr: Addr;
    private connection;
    constructor(addr: Addr, connection: IBoardConnector);
    get MaxValue(): number;
}
