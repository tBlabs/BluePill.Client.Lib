# TODO

- all events callbacks should be streams or events emitters/Rx cause now we can attach only one action to each event
- remove RTC?

# Connectors

Board Connector is a class implementing IBoardConnector interface. This interface contains only two methods: Send and OnUpdate.  

# Board

## IO types and their properites

| Type              | Setters    | Getters         | Methods               | Events                                                |
| ----------------- | ---------- | --------------- | --------------------- | ----------------------------------------------------- |
| DigitalInput      | *none*     | Value           | *none*                | OnChange, OnRising, OnFalling, OnPress, OnLongPress   |
| AdcInput          | *none*     | Value, MaxValue | *none*                | OnChange, OnRising, OnFalling                         |
| DigitalOutput     | Value      | Value           | On(), Off(), Toggle() | OnChange                                              |
| PwmOutput         | Value      | Value, MaxValue | *none*                | OnChange                                              |
| Display           | Value, Dot | Value, Dot      | OnChange              | OnChange                                              |

# Usage



# Example

## How to run example?

Connect board to PC with USB or Serial Port. Determine it's port.  
Start board's [Host/Daemon](https://github.com/tBlabs/BluePill.Daemon) with appriopriate params (host port and usb port).  
You are ready now to start board client.

There is few sample apps:
- sample.app.ts

You can start any of them with `node bin/SampleApps/sample.app.js`.
