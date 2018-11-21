import { Addr } from "../Board/Addr";
import { StateChange } from "../Board/StateChange";
export interface IBoardConnector {
    Set(addr: Addr, value: number): void;
    OnUpdate: (addr: Addr, stateChange: StateChange) => void;
    Disconnect(): void;
}
