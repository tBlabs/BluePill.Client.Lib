import { Board } from "../Board/Board";
import { BoardSocketConnector } from "../Connectors/BoardSocketConnector";
import { StateChange } from "../Board/StateChange";
import { IBoardConnector } from "../Connectors/IBoardConnector";

// const connectionString = "http://localhost:3001";
const connectionString = "http://192.168.1.1:3000";
const boardConnector: IBoardConnector = new BoardSocketConnector(connectionString);
const rPi: Board = new Board(boardConnector);
 
const connectionString2 = "http://localhost:3001";
const boardConnector2: IBoardConnector = new BoardSocketConnector(connectionString2);
const board: Board = new Board(boardConnector2);

rPi.Input1.OnKeyPress(() =>
{
    board.Output1.Toggle();
});
let p = 0;
board.Input1.OnKeyPress(() =>
{
    rPi.Output1.Toggle();
    p=1-p;
});

board.Adc1.OnChange((adc1State: StateChange) =>
{
    rPi.Display1.Value = adc1State.Current.Value;
});

rPi.Adc1.OnChange((adc1State: StateChange) =>
{
    board.Display1.Value = adc1State.Current.Value;
    rPi.Pwm1.Value = adc1State.Current.Value * 2.5;
    rPi.Pwm2.Value = rPi.Pwm2.MaxValue - (adc1State.Current.Value * 2.5);
});
let i = 0;
rPi.Display1.Dot = 3;
setInterval(()=>{
    if (p)
    rPi.Display1.Value = i++;
}, 10);

// board.Display1.OnValueChange(stateChange =>
// {
//     console.log(stateChange.Previous.Value);
// });

console.log('APP STARTED');