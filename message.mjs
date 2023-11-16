import clc from "cli-color";

function outputMessage(message) {
  console.log(clc.green(`My name is ${message}`));
}

outputMessage("Miriana");
