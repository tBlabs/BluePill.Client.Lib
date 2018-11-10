import { Board } from "../Board/Board";
import { BoardSocketConnector } from "../Connectors/BoardSocketConnector";
import { StateChange } from "../Board/StateChange";
import { IBoardConnector } from "../Connectors/IBoardConnector";

const connectionString = "http://localhost:3000";
const boardConnector: IBoardConnector = new BoardSocketConnector(connectionString);
const board: Board = new Board(boardConnector);

board.Input5.OnKeyPress(() =>
{
    board.Output1.Toggle();
});

board.Adc1.OnChange((adc1State: StateChange) =>
{
    board.Display1.Value = adc1State.Current.Value;
    board.Pwm1.Value = adc1State.Current.Value * 2.5;
    board.Pwm4.Value = board.Pwm4.MaxValue - (adc1State.Current.Value * 2.5);
});

console.log('APP STARTED');