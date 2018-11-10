import { Board } from "../Board/Board";
import { BoardConnector } from "../Connectors/BoardSocketConnector";

const connectionString = "http://localhost:3000";
const boardConnector = new BoardConnector(connectionString);
const board: Board = new Board(boardConnector);

board.Input5.OnKeyPress((stateChange) =>
{
    board.Output1.Toggle();
});

console.log('APP STARTED. Waiting for host..');