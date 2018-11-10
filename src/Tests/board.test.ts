import { Mock, It, Times } from "moq.ts";
import { Board } from "../Board/Board";
import { Addr } from "../Board/Addr";
import { StateChange, Measurement } from "../Board/StateChange";
import { IBoardConnector } from "../Connectors/IBoardConnector";

test('Actuator should send request to host', () =>
{
    // Given
    const connMock = new Mock<IBoardConnector>()
        .setup(i => i.Set(It.IsAny<Addr>(), It.IsAny<number>()))
        .returns(() => null);
    const board = new Board(connMock.object());

    // When
    board.Output1.On();

    // Then
    connMock.verify(i => i.Set(Addr.Output1, 1), Times.Once());
});

test('Sensor should generate event on host call', () =>
{
    expect.assertions(2);

    // Given
    const connMockObj = (new Mock<IBoardConnector>()).object();
    const board = new Board(connMockObj);

    // When & Then
    board.Input1.OnChange((stateChange: StateChange) =>
    {
        expect(stateChange.Current.Value).toBe(2);
    });
    board.Input1.OnRising((stateChange: StateChange) =>
    {
        expect(stateChange.Previous.Value).toBe(1);
    });

    connMockObj.OnUpdate(Addr.Input1, new StateChange(new Measurement(2, 0), new Measurement(1, 0)));
});

test('Actuator initially should return zero', () =>
{
    // Given
    const connMockObj = (new Mock<IBoardConnector>()).object();
    const board = new Board(connMockObj);

    // When
    const value = board.Output1.Value;

    // Then
    expect(value).toBe(0);
});

test('Actuator.Value should change after update from host', () =>
{
    // Given
    const connMockObj = (new Mock<IBoardConnector>()).object();
    const board = new Board(connMockObj);

    // When
    connMockObj.OnUpdate(Addr.Output1, new StateChange(new Measurement(1, 0), new Measurement(0, 0)));
    
    // Then
    const value = board.Output1.Value;
    expect(value).toBe(1);
});

test('Actuator should send update to host after new Value assign', () =>
{
    // Given
    const connMock = new Mock<IBoardConnector>()
        .setup(i => i.Set(It.IsAny<Addr>(), It.IsAny<number>()))
        .returns(() => null);
    const board = new Board(connMock.object());

    // When
    board.Output1.Value = 1;

    // Then
    connMock.verify(i => i.Set(Addr.Output1, 1), Times.Once());
});

test('Sensor initially should return zero', () =>
{
    // Given
    const connMockObj = (new Mock<IBoardConnector>()).object();
    const board = new Board(connMockObj);

    // When
    const value = board.Input1.Value;

    // Then
    expect(value).toBe(0);
});

test('Sensor.Value should change after update from host', () =>
{
    // Given
    const connMockObj = (new Mock<IBoardConnector>()).object();
    const board = new Board(connMockObj);

    // When
    connMockObj.OnUpdate(Addr.Input1, new StateChange(new Measurement(1, 0), new Measurement(0, 0)));

    // Then
    const value = board.Input1.Value;
    expect(value).toBe(1);
});
