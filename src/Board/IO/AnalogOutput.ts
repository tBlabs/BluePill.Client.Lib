import { StateChangeCallback } from "../StateChangeCallback";
import { Addr } from "../Addr";
import { IBoardConnector } from "../../Connectors/IBoardConnector";
import { Actuator } from "./Actuator";

export interface IAnalogOutput
{
    Value: number;
    MaxValue: number;
    OnChange(callback: StateChangeCallback): void
}

export class AnalogOutput extends Actuator implements IAnalogOutput
{
    constructor(
        public addr: Addr,
        private connection: IBoardConnector)
    {
        super(addr, connection);
    }

    public get MaxValue(): number
    {
        return 1024;
    }
}