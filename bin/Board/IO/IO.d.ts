import { StateChange } from "../StateChange";
import { Addr } from "../Addr";
export declare abstract class IO {
    addr: Addr | Addr[];
    abstract UpdateFromHost(addr: Addr, stateChange: StateChange): void;
    abstract readonly MaxValue: any;
}
