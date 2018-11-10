export class Measurement
{
    constructor(
        public Value: number,
        public Timestamp: number)
    { }
}

export class StateChange
{
    constructor(
        public Current: Measurement,
        public Previous: Measurement)
    { }
}
