import { StateChangeCallback } from "../StateChangeCallback";
import { Addr } from "../Addr";
import { IBoardConnector } from "../../Connectors/IBoardConnector";
import { Actuator } from "./Actuator";

export interface IPwmOutput
{
    Value: number;
    MaxValue: number;
    OnChange(callback: StateChangeCallback): void
}

export class PwmOutput extends Actuator implements IPwmOutput
{
    public MaxValue: number = 1024;

    constructor(
        public addr: Addr,
        private connection: IBoardConnector)
    {
        super(addr, connection);
    }
}