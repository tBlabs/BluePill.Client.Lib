"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Board_1 = require("../Board/Board");
const BoardSocketConnector_1 = require("../Connectors/BoardSocketConnector");
const connectionString = "http://localhost:3000";
const boardConnector = new BoardSocketConnector_1.BoardConnector(connectionString);
const board = new Board_1.Board(boardConnector);
board.Input5.OnKeyPress((stateChange) => {
    board.Output1.Toggle();
});
console.log('APP STARTED. Waiting for host..');
//# sourceMappingURL=test-app.js.map