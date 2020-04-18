import { IDigitalInput, DigitalInput } from "./IO/DigitalInput";
import { IDigitalOutput, DigitalOutput } from "./IO/DigitalOutput";
import { IAnalogInput, AnalogInput } from "./IO/AnalogInput";
import { IAnalogOutput, AnalogOutput } from "./IO/AnalogOutput";
import { IDisplay, Display } from "./IO/Display";
import { Addr } from "./Addr";
import { IBoardConnector } from "../Connectors/IBoardConnector";
import { StateChange } from "./StateChange";
import { IO } from "./IO/IO";
import { Clock } from "./IO/Clock";

export class Board
{
    public readonly Input1: IDigitalInput;
    public readonly Input2: IDigitalInput;
    public readonly Input3: IDigitalInput;
    public readonly Input4: IDigitalInput;
    public readonly Input5: IDigitalInput;
    public readonly Input6: IDigitalInput;
    public readonly Input7: IDigitalInput;
    public readonly Adc1: IAnalogInput;
    public readonly Adc2: IAnalogInput;
    public readonly Adc3: IAnalogInput;
    public readonly Adc4: IAnalogInput;
    public readonly Output1: IDigitalOutput;
    public readonly Output2: IDigitalOutput;
    public readonly Output3: IDigitalOutput;
    public readonly Output4: IDigitalOutput;
    public readonly Output5: IDigitalOutput;
    public readonly Output6: IDigitalOutput;
    public readonly Output7: IDigitalOutput;
    public readonly Clock1: Clock;
    public readonly Pwm1: IAnalogOutput;
    public readonly Pwm2: IAnalogOutput;
    public readonly Pwm3: IAnalogOutput;
    public readonly Pwm4: IAnalogOutput;
    public readonly Display1: IDisplay;

    constructor(connector: IBoardConnector)
    {
        this.Input1 = new DigitalInput(Addr.Input1);
        this.Input2 = new DigitalInput(Addr.Input2);
        this.Input3 = new DigitalInput(Addr.Input3);
        this.Input4 = new DigitalInput(Addr.Input4);
        this.Input5 = new DigitalInput(Addr.Input5);
        this.Input6 = new DigitalInput(Addr.Input6);
        this.Input7 = new DigitalInput(Addr.Input7);
        this.Adc1 = new AnalogInput(Addr.Adc1);
        this.Adc2 = new AnalogInput(Addr.Adc2);
        this.Adc3 = new AnalogInput(Addr.Adc3);
        this.Adc4 = new AnalogInput(Addr.Adc4);
        this.Output1 = new DigitalOutput(Addr.Output1, connector);
        this.Output2 = new DigitalOutput(Addr.Output2, connector);
        this.Output3 = new DigitalOutput(Addr.Output3, connector);
        this.Output4 = new DigitalOutput(Addr.Output4, connector);
        this.Output5 = new DigitalOutput(Addr.Output5, connector);
        this.Output6 = new DigitalOutput(Addr.Output6, connector);
        this.Output7 = new DigitalOutput(Addr.Output7, connector);
        this.Pwm1 = new AnalogOutput(Addr.Pwm1, connector);
        this.Pwm2 = new AnalogOutput(Addr.Pwm2, connector);
        this.Pwm3 = new AnalogOutput(Addr.Pwm3, connector);
        this.Pwm4 = new AnalogOutput(Addr.Pwm4, connector);
        this.Clock1 = new Clock(Addr.RTC, connector);
        this.Display1 = new Display(Addr.Display1, Addr.Display1Dot, connector);

        connector.OnUpdate = (addr: Addr, stateChange: StateChange) =>
        {
            try
            {
               
                const io: IO = this.IoByAddr(addr);

                io.UpdateFromHost(addr, stateChange);
            }
            catch (error)
            {
                console.log(`IO ${ addr } not implemented yet?`);
            }
        };
    }

    private IoByAddr(addr: Addr): IO
    {
        const thisClassPropsNames: string[] = Object.keys(this);
        const iosNames: string[] = thisClassPropsNames.filter(io => this[io] instanceof IO);
        const ioName = iosNames.find(ioName => 
        {
            const io: IO = this[ioName];

            if (Array.isArray(io.addr))
            {
                return io.addr.includes(addr);
            }
            else
            {
                return (io.addr === addr);
            }
        });

        if (ioName === undefined)
        {
            throw new Error(`IO ${ addr } not found`);
        }

        return this[ioName];
    }
}
