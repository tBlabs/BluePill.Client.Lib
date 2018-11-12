"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SocketIoClient = require("socket.io-client");
const StateChange_1 = require("../Board/StateChange");
class BoardSocketConnector {
    MapIoStateToStateChange(ioState) {
        return new StateChange_1.StateChange(new StateChange_1.Measurement(ioState.currentValue, ioState.currentValueUpdateTimestamp), new StateChange_1.Measurement(ioState.previousValue, ioState.previousValueUpdateTimestamp));
    }
    constructor(connectionString) {
        this.socket = SocketIoClient(connectionString);
        this.socket.on('connect', () => {
            console.log('connected on', this.socket.id);
            this.socket.emit('get-all');
        });
        // this.socket.on('reconnect', (err) => console.log('recon', err));
        this.socket.on('disconnect', (err) => console.log('disc', err));
        this.socket.on('error', (err) => console.log(err));
        this.socket.on('update-all', (allIo) => {
            allIo.forEach((ioState) => {
                const addr = ioState.addr;
                const stateChange = this.MapIoStateToStateChange(ioState);
                if (this.OnUpdate)
                    this.OnUpdate(addr, stateChange);
            });
        });
        this.socket.on('update', (ioState) => {
            const addr = ioState.addr;
            const stateChange = this.MapIoStateToStateChange(ioState);
            if (this.OnUpdate)
                this.OnUpdate(addr, stateChange);
        });
    }
    Set(addr, value) {
        this.socket.emit('set', addr, value);
    }
    Get(addr) {
        this.socket.emit('get', addr);
    }
}
exports.BoardSocketConnector = BoardSocketConnector;
//# sourceMappingURL=BoardSocketConnector.js.map