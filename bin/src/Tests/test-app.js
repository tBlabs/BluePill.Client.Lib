"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Board_1 = require("../Board/Board");
const BoardSocketConnector_1 = require("../Connectors/BoardSocketConnector");
// const connectionString = "http://localhost:3001";
const connectionString = "http://192.168.1.1:3000";
const boardConnector = new BoardSocketConnector_1.BoardSocketConnector(connectionString);
const rPi = new Board_1.Board(boardConnector);
const connectionString2 = "http://localhost:3001";
const boardConnector2 = new BoardSocketConnector_1.BoardSocketConnector(connectionString2);
const board = new Board_1.Board(boardConnector2);
rPi.Input1.OnKeyPress(() => {
    board.Output1.Toggle();
});
let p = 0;
board.Input1.OnKeyPress(() => {
    rPi.Output1.Toggle();
    p = 1 - p;
});
board.Adc1.OnChange((adc1State) => {
    rPi.Display1.Value = adc1State.Current.Value;
});
rPi.Adc1.OnChange((adc1State) => {
    board.Display1.Value = adc1State.Current.Value;
    rPi.Pwm1.Value = adc1State.Current.Value * 2.5;
    rPi.Pwm2.Value = rPi.Pwm2.MaxValue - (adc1State.Current.Value * 2.5);
});
let i = 0;
rPi.Display1.Dot = 3;
setInterval(() => {
    if (p)
        rPi.Display1.Value = i++;
}, 10);
// board.Display1.OnValueChange(stateChange =>
// {
//     console.log(stateChange.Previous.Value);
// });
console.log('APP STARTED');
//# sourceMappingURL=test-app.js.map