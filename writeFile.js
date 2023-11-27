const fs = require("fs");

const content = "Hello, this is second file";
const filePath = "text-2.txt";

fs.writeFile(filePath, content, (err) => {
  if (err) {
    console.log("Error", err);
  } else {
    console.log(`${filePath}`);
  }
});
