"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moq_ts_1 = require("moq.ts");
const Board_1 = require("../Board/Board");
const Addr_1 = require("../Board/Addr");
const StateChange_1 = require("../Board/StateChange");
test('Actuator should send request to host', () => {
    // Given
    const connMock = new moq_ts_1.Mock()
        .setup(i => i.Set(moq_ts_1.It.IsAny(), moq_ts_1.It.IsAny()))
        .returns(() => null);
    const board = new Board_1.Board(connMock.object());
    // When
    board.Output1.On();
    // Then
    connMock.verify(i => i.Set(Addr_1.Addr.Output1, 1), moq_ts_1.Times.Once());
});
test('Sensor should generate event on host call', () => {
    expect.assertions(2);
    // Given
    const connMockObj = (new moq_ts_1.Mock()).object();
    const board = new Board_1.Board(connMockObj);
    // When & Then
    board.Input1.OnChange((stateChange) => {
        expect(stateChange.Current.Value).toBe(2);
    });
    board.Input1.OnRising((stateChange) => {
        expect(stateChange.Previous.Value).toBe(1);
    });
    connMockObj.OnUpdate(Addr_1.Addr.Input1, new StateChange_1.StateChange(new StateChange_1.Measurement(2, 0), new StateChange_1.Measurement(1, 0)));
});
test('Actuator initially should return zero', () => {
    // Given
    const connMockObj = (new moq_ts_1.Mock()).object();
    const board = new Board_1.Board(connMockObj);
    // When
    const value = board.Output1.Value;
    // Then
    expect(value).toBe(0);
});
test('Actuator.Value should change after update from host', () => {
    // Given
    const connMockObj = (new moq_ts_1.Mock()).object();
    const board = new Board_1.Board(connMockObj);
    // When
    connMockObj.OnUpdate(Addr_1.Addr.Output1, new StateChange_1.StateChange(new StateChange_1.Measurement(1, 0), new StateChange_1.Measurement(0, 0)));
    // Then
    const value = board.Output1.Value;
    expect(value).toBe(1);
});
test('Actuator should send update to host after new Value assign', () => {
    // Given
    const connMock = new moq_ts_1.Mock()
        .setup(i => i.Set(moq_ts_1.It.IsAny(), moq_ts_1.It.IsAny()))
        .returns(() => null);
    const board = new Board_1.Board(connMock.object());
    // When
    board.Output1.Value = 1;
    // Then
    connMock.verify(i => i.Set(Addr_1.Addr.Output1, 1), moq_ts_1.Times.Once());
});
test('Sensor initially should return zero', () => {
    // Given
    const connMockObj = (new moq_ts_1.Mock()).object();
    const board = new Board_1.Board(connMockObj);
    // When
    const value = board.Input1.Value;
    // Then
    expect(value).toBe(0);
});
test('Sensor.Value should change after update from host', () => {
    // Given
    const connMockObj = (new moq_ts_1.Mock()).object();
    const board = new Board_1.Board(connMockObj);
    // When
    connMockObj.OnUpdate(Addr_1.Addr.Input1, new StateChange_1.StateChange(new StateChange_1.Measurement(1, 0), new StateChange_1.Measurement(0, 0)));
    // Then
    const value = board.Input1.Value;
    expect(value).toBe(1);
});
//# sourceMappingURL=board.test.js.map