import { IBoardConnector } from "./IBoardConnector";
import SocketIoClient from 'socket.io-client';
import { IoState } from "./IoState";
import { StateChange, Measurement } from "../Board/StateChange";
import { Addr } from "../Board/Addr";

export class BoardSocketConnector implements IBoardConnector
{
    private socket: SocketIOClient.Socket;

    public Disconnect(): void
    {
        this.socket.close();
    }

    public OnUpdate = (addr: Addr, stateChange: StateChange) => { };

    private MapIoStateToStateChange(ioState: IoState): StateChange
    {
        return new StateChange(
            new Measurement(ioState.currentValue, ioState.currentValueUpdateTimestamp),
            new Measurement(ioState.previousValue, ioState.previousValueUpdateTimestamp));
    }

    constructor(connectionString: string, log: boolean = false)
    {
        this.socket = SocketIoClient(connectionString);
        this.socket.on('connect', () =>
        {
            if (log) console.log('BLUE PILL CLIENT CONNECTED @', this.socket.id);

            // this.socket.emit('get-all');
        });

        this.socket.on('disconnect', (err) =>
        {
            if (log) console.log('BLUE PILL CLIENT DISCONNECTED', err);
            // this.socket.connect();
        });

        this.socket.on('error', (err) => { if (log) console.log('BLUE PILL ERROR', err) });
        this.socket.on('driver-error', (err) => { if (log) console.log('BLUE PILL DRIVER ERROR', err) });

        this.socket.on('update-all', (allIo: IoState[]) =>
        {
            allIo.forEach((ioState: IoState) =>
            {
                const addr = ioState.addr;
                const stateChange = this.MapIoStateToStateChange(ioState);

                this.OnUpdate?.(addr, stateChange);
            });
        });

        this.socket.on('update', (ioState: IoState) =>
        {
            const addr = ioState.addr;
            const stateChange = this.MapIoStateToStateChange(ioState);

            this.OnUpdate?.(addr, stateChange);
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
