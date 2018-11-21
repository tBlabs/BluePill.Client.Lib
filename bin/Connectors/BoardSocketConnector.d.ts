import { IBoardConnector } from "./IBoardConnector";
import { StateChange } from "../Board/StateChange";
import { Addr } from "../Board/Addr";
export declare class BoardSocketConnector implements IBoardConnector {
    private socket;
    Disconnect(): void;
    OnUpdate: (addr: Addr, stateChange: StateChange) => void;
    private MapIoStateToStateChange;
    constructor(connectionString: string);
    Set(addr: any, value: any): void;
    Get(addr: any): void;
}
