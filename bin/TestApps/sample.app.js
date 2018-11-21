"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Board_1 = require("../Board/Board");
const BoardSocketConnector_1 = require("../Connectors/BoardSocketConnector");
const connectionString = "http://localhost:3000";
// const connectionString = "http://192.168.1.1:3000";
const boardConnector = new BoardSocketConnector_1.BoardSocketConnector(connectionString);
const board = new Board_1.Board(boardConnector);
board.Input1.OnKeyPress(() => {
    board.Output1.Toggle();
});
board.Adc1.OnChange((adc1State) => {
    board.Display1.Value = adc1State.Current.Value;
    board.Pwm1.Value = adc1State.Current.Value * 2.5;
});
console.log('APP STARTED');
board.Display1.Value = -1;
// boardConnector.Disconnect();
console.log('END');
//# sourceMappingURL=sample.app.js.map