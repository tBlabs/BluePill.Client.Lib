"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = __importDefault(require("socket.io-client"));
const StateChange_1 = require("../Board/StateChange");
class BoardSocketConnector {
    constructor(connectionString, log = false) {
        this.OnUpdate = (addr, stateChange) => { };
        this.socket = socket_io_client_1.default(connectionString);
        this.socket.on('connect', () => {
            if (log)
                console.log('CONNECT', this.socket.id);
            // this.socket.emit('get-all');
        });
        this.socket.on('disconnect', (err) => {
            if (log)
                console.log('DISCONNECT', err);
            // this.socket.connect();
        });
        this.socket.on('error', (err) => { if (log)
            console.log('ERROR', err); });
        this.socket.on('driver-error', (err) => { if (log)
            console.log('DRIVER ERROR', err); });
        this.socket.on('update-all', (allIo) => {
            // console.log('UPDATE ALL REQ', allIo);
            allIo.forEach((ioState) => {
                var _a, _b;
                const addr = ioState.addr;
                const stateChange = this.MapIoStateToStateChange(ioState);
                (_b = (_a = this).OnUpdate) === null || _b === void 0 ? void 0 : _b.call(_a, addr, stateChange);
            });
        });
        this.socket.on('update', (ioState) => {
            var _a, _b;
            const addr = ioState.addr;
            const stateChange = this.MapIoStateToStateChange(ioState);
            (_b = (_a = this).OnUpdate) === null || _b === void 0 ? void 0 : _b.call(_a, addr, stateChange);
        });
    }
    Disconnect() {
        this.socket.close();
    }
    MapIoStateToStateChange(ioState) {
        return new StateChange_1.StateChange(new StateChange_1.Measurement(ioState.currentValue, ioState.currentValueUpdateTimestamp), new StateChange_1.Measurement(ioState.previousValue, ioState.previousValueUpdateTimestamp));
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