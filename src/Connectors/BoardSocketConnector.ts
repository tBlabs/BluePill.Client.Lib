import { IBoardConnector } from "./IBoardConnector";
import * as SocketIoClient from 'socket.io-client';
import { IoState } from "./IoState";
import { StateChange, Measurement } from "../Board/StateChange";
import { Addr } from "../Board/Addr";
import { Socket } from "socket.io-client";

export class BoardSocketConnector implements IBoardConnector
{
    private socket: SocketIOClient.Socket;
    
    public OnUpdate!: (addr: Addr, stateChange: StateChange) => void;

    private MapIoStateToStateChange(ioState: IoState):StateChange
    {
        return new StateChange(
            new Measurement(ioState.currentValue, ioState.currentValueUpdateTimestamp),
            new Measurement(ioState.previousValue, ioState.previousValueUpdateTimestamp));
    }

    constructor(connectionString: string)
    {
        this.socket = SocketIoClient(connectionString);
        
        this.socket.on('connect', () =>
        {
            console.log('connected on', this.socket.id);
            this.socket.emit('get-all');
        });

        

        // this.socket.on('reconnect', (err) => console.log('recon', err));
        this.socket.on('disconnect', (err) => console.log('disc', err));
        this.socket.on('error', (err) => console.log(err));

        this.socket.on('update-all', (allIo: IoState[]) =>
        {
            allIo.forEach((ioState: IoState) =>
            {
                const addr = ioState.addr;
                const stateChange = this.MapIoStateToStateChange(ioState);
                
                if (this.OnUpdate)
                    this.OnUpdate(addr, stateChange);
            });
        });
        
        this.socket.on('update', (ioState: IoState) =>
        {
            const addr = ioState.addr;
            const stateChange = this.MapIoStateToStateChange(ioState);

            if (this.OnUpdate)
                this.OnUpdate(addr, stateChange);
        });
    }

    public Set(addr, value): void
    {
        this.socket.emit('set', addr, value);
    }

    public Get(addr): void
    {
        this.socket.emit('get', addr);
    }
}
