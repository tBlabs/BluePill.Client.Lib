import { Addr } from "../Addr";
import { Actuator } from "../Actuator";
import { IBoardConnector } from "../../Connectors/IBoardConnector";
import { StateChangeCallback } from "../StateChangeCallback";

export interface IDigitalOutput
{
    Value: number;
    On(): void;
    Off(): void;
    Toggle(): void;
    OnChange(callback: StateChangeCallback): void
}

export class DigitalOutput extends Actuator
{
    constructor(
        public addr: Addr,
        private connection: IBoardConnector)
    {
        super(addr, connection);
    }

    public On(): void
    {
        this.connection.Set(this.addr, 1);
    }

    public Off(): void
    {
        this.connection.Set(this.addr, 0);
    }

    public Toggle(): void
    {
        this.connection.Set(this.addr, 1 - this.Value);
    }
}
