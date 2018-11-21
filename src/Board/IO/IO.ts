import { StateChange } from "../StateChange";
import { Addr } from "../Addr";

export abstract class IO
{
    public addr!: Addr | Addr[];
    public abstract UpdateFromHost(addr: Addr, stateChange: StateChange): void; // addr param here make sense only when IO.addr is an array
    public abstract get MaxValue();
}
