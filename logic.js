const fs = require("fs").promises;

async function readFileAsync(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return data;
  } catch (err) {
    console.error("Error reading file:", err);
    throw err;
  }
}

async function parseData(filePath) {
  const data = await readFileAsync(filePath);
  const arr = [];
  const lines = data.split("\r\n");
  const titles = lines[0].trim().replace(/\s+/g, "_").split(",");

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const values = line.split(",");
    const obj = {};
    for (let j = 0; j < titles.length; j++) {
      obj[titles[j]] = values[j];
    }
    arr.push(obj);
  }
  console.log(arr);
  return arr;
}

module.exports = {
  parseData,
};
