const fs = require("fs");

const readableStream = fs.createReadStream("input.txt", {
  highWaterMark: 15,
});

const writableStream = fs.createWriteStream("output.txt", "utf-8");

const readFileTxt = () => {
  readableStream.on("readable", () => {
    try {
      let chunk;
      while ((chunk = readableStream.read()) !== null) {
        writableStream.write(`${chunk}\n`);
      }
    } catch (error) {
      throw new Error(error);
    }
  });
};

readFileTxt();
