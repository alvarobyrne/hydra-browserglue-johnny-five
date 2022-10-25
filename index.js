const dgram = require("dgram");
const udp = dgram.createSocket("udp4");
const osc = require("osc-min");
const { Board, Sensor } = require("johnny-five");
const board = new Board();

board.on("ready", () => {
  // Create a new generic sensor instance for
  // a sensor connected to an analog (ADC) pin
  const sensor = new Sensor("A7");
  const senderPort = 4000;

  // When the sensor value changes, log the value
  sensor.on("change", value => {
    console.log("Sensor: ");
    console.log("  value  : ", sensor.value);
    console.log("-----------------");
    var oscPacket = {
        oscType: "message",
        // timetag: time - prevTime,
        address: "/foo",
        args: [
          {
            type: "integer",
            value: sensor.value,
          },
        ],
      };
    let buf = osc.toBuffer(oscPacket);
    return udp.send(buf, 0, buf.length, senderPort, "localhost");
    });
});
