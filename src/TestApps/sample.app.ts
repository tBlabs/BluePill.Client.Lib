import { Board } from "../Board/Board";
import { BoardSocketConnector } from "../Connectors/BoardSocketConnector";
import { StateChange } from "../Board/StateChange";
import { IBoardConnector } from "../Connectors/IBoardConnector";

const connectionString = "http://localhost:3000";
// const connectionString = "http://192.168.1.1:3000";
const boardConnector: IBoardConnector = new BoardSocketConnector(connectionString);
const board: Board = new Board(boardConnector);

board.Input1.OnKeyPress(() =>
{
    board.Output1.Toggle();
});

board.Adc1.OnChange((adc1State: StateChange) =>
{
    board.Display1.Value = adc1State.Current.Value;
    board.Pwm1.Value = adc1State.Current.Value * 2.5;
});

console.log('APP STARTED');

board.Display1.Value = -1;
// boardConnector.Disconnect();

console.log('END');