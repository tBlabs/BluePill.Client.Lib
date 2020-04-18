import { Board } from "../Board/Board";
import { BoardSocketConnector } from "../Connectors/BoardSocketConnector";
import { StateChange } from "../Board/StateChange";
import { IBoardConnector } from "../Connectors/IBoardConnector";


console.log('SAMPLE APP STARTED');

// const connectionString = "http://localhost:3001";
const connectionString = "http://192.168.43.48:3000";
const boardConnector: IBoardConnector = new BoardSocketConnector(connectionString, true);
const rPi: Board = new Board(boardConnector);

rPi.Input1.OnKeyPress(() =>
{
    console.log('KEY 1 PRESS');
    rPi.Output1.Toggle();
    i+=100;
});

let i = 0;
rPi.Display1.Dot = 3;
setInterval(() =>
{
   rPi.Display1.Value = i++;
}, 500);
