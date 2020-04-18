"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Board_1 = require("../Board/Board");
const BoardSocketConnector_1 = require("../Connectors/BoardSocketConnector");
console.log('SAMPLE APP STARTED');
// const connectionString = "http://localhost:3001";
const connectionString = "http://192.168.43.48:3000";
const boardConnector = new BoardSocketConnector_1.BoardSocketConnector(connectionString, true);
const rPi = new Board_1.Board(boardConnector);
rPi.Input1.OnKeyPress(() => {
    console.log('KEY 1 PRESS');
    rPi.Output1.Toggle();
    i += 100;
});
let i = 0;
rPi.Display1.Dot = 3;
setInterval(() => {
    rPi.Display1.Value = i++;
}, 500);
//# sourceMappingURL=sample2.app.js.map