const clc = require("cli-color");

function outputMessage(message) {
  console.log(clc.purple(`My name is ${message}`));
}

outputMessage("Miriana");
