# Client

const board = new BluePillClient(connectionString);
board.input1.onChange = (state)=>{

}
board.output1.value = 1
board.output1.on()
board.pwm1 = 100;



This is a HTTP driven "driver" for serial connected (USB or UART) dedicated board called **BluePill** (firmware can be found [here](https://github.com/tBlabs/BluePill.Firmware)).

