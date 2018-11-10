import { StateChange } from "../StateChange";
import { Addr } from "../Addr";

export abstract class IO
{
    addr!: Addr | Addr[];
    abstract UpdateFromHost(addr: Addr, stateChange: StateChange): void; // addr param here make sense only when IO.addr is an array
}
