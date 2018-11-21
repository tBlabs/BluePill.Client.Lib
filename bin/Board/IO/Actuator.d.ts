import { StateChangeCallback } from "../StateChangeCallback";
import { IBoardConnector } from "../../Connectors/IBoardConnector";
import { StateChange } from "../StateChange";
import { IO } from "./IO";
import { Addr } from "../Addr";
export declare abstract class Actuator extends IO {
    addr: number;
    private connector;
    private onChangeCallback?;
    OnChange(callback: StateChangeCallback): void;
    constructor(addr: number, connector: IBoardConnector);
    private value;
    Value: number;
    UpdateFromHost(addr: Addr, stateChange: StateChange): void;
    ExecuteEvents(stateChange: StateChange): void;
}
