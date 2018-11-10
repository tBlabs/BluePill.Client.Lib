import { DigitalOutput, IDigitalOutput } from "./IO/DigitalOutput";
import { DigitalInput, IDigitalInput } from "./IO/DigitalInput";
import { Sensor } from "./Sensor";
import { Addr } from "./Addr";
import { Actuator } from "./Actuator";
import { IBoardConnector } from "../Connectors/IBoardConnector";
import { StateChange } from "./StateChange";

export class Board
{
    public readonly Input1: IDigitalInput;
    public readonly Input2: IDigitalInput;
    public readonly Input3: IDigitalInput;
    public readonly Input4: IDigitalInput;
    public readonly Input5: IDigitalInput;
    public readonly Input6: IDigitalInput;
    public readonly Input7: IDigitalInput;
    public readonly Output1: IDigitalOutput;
    public readonly Output2: IDigitalOutput;
    public readonly Output3: IDigitalOutput;
    public readonly Output4: IDigitalOutput;
    public readonly Output5: IDigitalOutput;
    public readonly Output6: IDigitalOutput;
    public readonly Output7: IDigitalOutput;
    public readonly Output33: DigitalOutput;

    constructor(connector: IBoardConnector)
    {
        this.Input1 = new DigitalInput(Addr.Input1);
        this.Input2 = new DigitalInput(Addr.Input2);
        this.Input3 = new DigitalInput(Addr.Input3);
        this.Input4 = new DigitalInput(Addr.Input4);
        this.Input5 = new DigitalInput(Addr.Input5);
        this.Input6 = new DigitalInput(Addr.Input6);
        this.Input7 = new DigitalInput(Addr.Input7);
        this.Output1 = new DigitalOutput(Addr.Output1, connector);
        this.Output2 = new DigitalOutput(Addr.Output2, connector);
        this.Output3 = new DigitalOutput(Addr.Output3, connector);
        this.Output4 = new DigitalOutput(Addr.Output4, connector);
        this.Output5 = new DigitalOutput(Addr.Output5, connector);
        this.Output6 = new DigitalOutput(Addr.Output6, connector);
        this.Output7 = new DigitalOutput(Addr.Output7, connector);
        this.Output33 = new DigitalOutput(Addr.RTC, connector);

        connector.OnUpdate = (addr: Addr, stateChange: StateChange) =>
        {
            try
            {
                const io = this.IoByAddr(addr);
                io.UpdateFromHost(stateChange);
            }
            catch (error)
            {
                console.log('IO not implemented yet');
            }
        };
    }

    private IoByAddr(addr: Addr): Sensor | Actuator
    {
        const allIoNames = Object.keys(this);
        const ios = allIoNames.filter(io => this[io] instanceof Sensor || (this[io] instanceof Actuator));
        const io = ios.find(ioName => this[ioName].addr === addr);
        
        if (io === undefined)
        {
            throw new Error(`IO ${ addr } not found`);
        }

        return this[io];
    }
}
