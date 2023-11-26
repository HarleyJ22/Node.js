const figlet = require("figlet");

const textToArt = "Hi guys";

figlet(textToArt, function (err, data) {
  if (err) {
    console.log("Somenthing went wrong...");
    console.dir(err);
    return;
  }

  console.log(data);
});
