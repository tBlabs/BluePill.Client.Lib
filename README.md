TODO
- all events callbacks should be streams or events emitters/Rx cause now we can attach only one action to each event
- remove RTC?
- remove `/bin` from import (copy bin files level up during publishing?)

# BluePill.Client.Lib

It is a client for a `BluePill development board` in a form of library.  
It is distributed as a node package with TypeScript definition file.  

## Install

`npm i bluepill-client-library`

## Import

`import { BluePillSocketConnector, BluePillBoard } from 'bluepill-client-library/bin';` // TODO: remove `/bin`

## Usage

```
const connectionString = 'http://localhost:3000';
const connector = new BluePillSocketConnector(connectionString);
const board = new BLuePillBoard(connector);

board.Input1.OnPress.subscribe(() =>
{
    board.Output1.Toggle();
});
```

# Connectors

Board Connector is a class implementing IBoardConnector interface. This interface contains only two methods: Send and OnUpdate.  

## Standalone usage

```
const connector = new BoardSocketConnector('http://localhost:3000');
connector.Set(12, 1234);
connector.OnUpdate = (addr, stateChange) => console.log(addr, stateChange);
```

# Board

## IO types and their properties

| Type              | Setters    | Getters                           | Methods               | Events                                                |
| ----------------- | ---------- | --------------------------------- | --------------------- | ----------------------------------------------------- |
| DigitalInput      | *none*     | Value, MaxValue                   | *none*                | OnChange, OnRising, OnFalling, OnPress, OnLongPress   |
| AdcInput          | *none*     | Value, MaxValue                   | *none*                | OnChange, OnRising, OnFalling                         |
| DigitalOutput     | Value      | Value, MaxValue                   | On(), Off(), Toggle() | OnChange                                              |
| PwmOutput         | Value      | Value, MaxValue                   | *none*                | OnChange                                              |
| Clock (RTC)       | Value      | Value, MaxValue                   | *none*                | OnChange                                              |
| Display           | Value, Dot | Value, Dot, MaxValue, MaxDotValue | *none*                | OnValueChange                                         |

## How to run example?

Connect board to PC with USB or Serial Port. Determine it's port.  
Start board's [Daemon](https://github.com/tBlabs/BluePill.Daemon) with appropriate params (host port and usb/serial port).  
You are ready now to start board client.

There is few sample apps:
- sample.app.ts

You can start any of them with `node bin/SampleApps/sample.app.js`.
