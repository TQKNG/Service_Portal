const fs = require("fs");
const { exec } = require('child_process');
const os = require("os");
const path = require("path");
const {addDelimiter, removeDelimiter} = require('./TextFormatter');


async function storeImage(subloc, data, fileName) {
  // Define the directory for uploaded images
  const uploadDir = path.join(process.cwd(), `/assets/${subloc}`);

  // Format filename with delimiter
  let formattedFileName = addDelimiter(fileName, "_");

  // Ensure the directory exists
  fs.mkdirSync(uploadDir, { recursive: true });

  // Define the path for the new image
  const dataPath = path.join(uploadDir, `${formattedFileName}.png`);

  //Convert to base 64
  let base64Data = data.split(";base64,").pop();
  fs.writeFile(dataPath, base64Data, { encoding: "base64" }, function (err) {
    if (err) {
      console.error("Error creating image file:", err);
    } else {
      console.log("Image file created successfully");
    }
  });
}

async function storeAudio(subloc, data, fileName) {
  // Define the directory for uploaded images
  const uploadDir = path.join(process.cwd(), `/assets/${subloc}`);

   // Format filename with delimiter
   let formattedFileName = addDelimiter(fileName, "_");

  // Ensure the directory exists
  fs.mkdirSync(uploadDir, { recursive: true });

  // Define the path for the new image
  const dataPath = path.join(uploadDir, `${formattedFileName}.mp3`);

  //Convert to base 64
  let base64Data = data.split(";base64,").pop();
  fs.writeFile(dataPath, base64Data, { encoding: "base64" }, function (err) {
    if (err) {
      console.error("Error creating audio file:", err);
    } else {
      console.log("Audio file created successfully");
    }
  });
}

async function storeJson(subloc, data, fileName) {
  // Define the directory for uploaded images
  const uploadDir = path.join(process.cwd(), `/assets/${subloc}`);

  // Ensure the directory exists
  fs.mkdirSync(uploadDir, { recursive: true });

  // Define the path for the new image
  const dataPath = path.join(uploadDir, `${fileName}.json`);

  fs.writeFile(dataPath, JSON.stringify(data, null, 2), function (err) {
    if (err) {
      console.error("Error creating JSON file:", err);
    } else {
      console.log("JSON file created successfully");
    }
  });
}

async function retrieveImage(subloc, id) {
  // Define the directory for uploaded images
  const uploadDir = path.join(process.cwd(), `/assets/${subloc}`);

  
  // Format filename with delimiter
  let formattedFileName = removeDelimiter(id);
  console.log('Test ID2', formattedFileName)

  // Ensure the directory exists
  fs.mkdirSync(uploadDir, { recursive: true });

  const fileName = formattedFileName + ".png";

  const imagePath = path.join(uploadDir, fileName);

  const url = `https://b9dk2wds-5000.use.devtunnels.ms/assets/${subloc}/${fileName}`;

  let img = fs.readFileSync(imagePath, { encoding: "base64" });

  return url;
}

async function retrieveAudio(subloc, id) {
  // Define the directory for uploaded images
  const uploadDir = path.join(process.cwd(), `/assets/${subloc}`);

  // Format filename with delimiter
  let formattedFileName = removeDelimiter(id, "_");

  // Ensure the directory exists
  fs.mkdirSync(uploadDir, { recursive: true });

  const fileName = formattedFileName + ".mp3";

  const audioPath = path.join(uploadDir, fileName);

  const url = `https://b9dk2wds-5000.use.devtunnels.ms/assets/SongAudio/${fileName}`;

  let audio = fs.readFileSync(audioPath, { encoding: "base64" });

  return url;
}

async function retrieveJson(subloc, id) {
  // Define the directory for uploaded images
  const uploadDir = path.join(process.cwd(), `/assets/${subloc}`);
  // Ensure the directory exists
  fs.mkdirSync(uploadDir, { recursive: true });

  const fileName = id;

  const jsonPath = path.join(uploadDir, `${fileName}.json`);

  // Read JSON file synchronously
  let data = fs.readFileSync(jsonPath);

  let jsonData = await JSON.parse(data);

  return jsonData;
}

async function storeEPUB(subloc, data, fileName) {

  // Define the directory for uploaded images
  const uploadDir = path.join(process.cwd(), `/assets/${subloc}`);

  // Ensure the directory exists
  fs.mkdirSync(uploadDir, { recursive: true });

  // Define the path for the new image
  const dataPath = path.join(uploadDir, `${fileName}.epub`);

   //Convert to base 64
   let base64Data = data.split(";base64,").pop();

  // Convert pdf to epub
  const convertedData = await convertPDFtoEPUB(base64Data, dataPath);

  return convertedData;
}

async function retrieveEPUB(subloc, id) {
  // Define the directory for uploaded images
  const uploadDir = path.join(process.cwd(), `/assets/${subloc}`);
  // Ensure the directory exists
  fs.mkdirSync(uploadDir, { recursive: true });

  const fileName = id + ".epub";

  const bookPath = path.join(uploadDir, fileName);

  const url = `https://b9dk2wds-5000.use.devtunnels.ms/assets/BookData/${fileName}`;

  let book = fs.readFileSync(bookPath, { encoding: "base64" });

  return url;

}

async function convertPDFtoEPUB(base64Data, dataPath) {

  // Create a temporary file
  const tempFilePath = path.join(os.tmpdir(), "temp.pdf");

  // Decode the base64 data
  const data = Buffer.from(base64Data, 'base64');

  // Write the decoded data to the temporary file
  await fs.promises.writeFile(tempFilePath, data);

  return new Promise((resolve, reject) => {
    exec(`ebook-convert "${tempFilePath}" "${dataPath}"`, (error) => {
      // Delete the temporary file
      fs.unlinkSync(tempFilePath);

      if (error) {
        console.error(`ebook-convert error: ${error}`);
        reject(error);
      } else {
        resolve(dataPath);
      }
    });
  });
}

async function convertEPUBtoPDF(data) {}

module.exports = {
  storeImage,
  retrieveImage,
  storeJson,
  retrieveJson,
  storeAudio,
  retrieveAudio,
  storeEPUB,
  retrieveEPUB,
  convertPDFtoEPUB,
  convertEPUBtoPDF,
};
