const fs = require("fs");

const path = require("path");

const filePath = path.join(__dirname, "textfile.txt");
console.log(__dirname);
// Read the content of the file
fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error(`Error reading file: ${err}`);
    return;
  }
  console.log(data);
  // Remove extra spaces using regular expression
  const cleanedData = data.replace(/\s+/g, " ");

  // Write the cleaned data back to the file
  fs.writeFile(filePath, cleanedData, "utf8", (err) => {
    if (err) {
      console.error(`Error writing to file: ${err}`);
    } else {
      console.log("File successfully cleaned and updated.");

      // Read the content of the updated file and log it
      fs.readFile(filePath, "utf8", (err, updatedData) => {
        if (err) {
          console.error(`Error reading updated file: ${err}`);
        } else {
          console.log("Updated file content:");
          console.log(updatedData);
        }
      });
    }
  });
});
