import "@babel/polyfill";

console.log('start');

// import { BoardSocketConnector } from './../../../bin/src/Connectors/BoardSocketConnector';
// import {Board} from './../../../bin/src/Board/Board';
// import * as io from 'socket.io-client';

const connectionString = "http://localhost:3000";
const socket = io(connectionString);
socket.emit('set', 23, 9876);
// const boardConnector = new BoardSocketConnector(connectionString);
// boardConnector.Set(23, 5432);
// const board = new Board(boardConnector);

// board.Input1.OnKeyPress(() =>
// {
//     console.log('aa');
//     board.Output1.Toggle();
// });

// board.Output1.OnChange((v)=>console.log('out1', v));

// import {Foo} from './foo';
// Foo();

console.log('end');