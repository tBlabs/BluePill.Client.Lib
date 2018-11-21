import { Addr } from "../Addr";
import { Actuator } from "../IO/Actuator";
import { IBoardConnector } from "../../Connectors/IBoardConnector";
import { StateChangeCallback } from "../StateChangeCallback";
export interface IDigitalOutput {
    Value: number;
    On(): void;
    Off(): void;
    Toggle(): void;
    OnChange(callback: StateChangeCallback): void;
}
export declare class DigitalOutput extends Actuator {
    addr: Addr;
    private connection;
    constructor(addr: Addr, connection: IBoardConnector);
    readonly MaxValue: number;
    On(): void;
    Off(): void;
    Toggle(): void;
}
