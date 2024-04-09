const fs = require("fs");
const path = require("path");
const ebookConverter = require("node-ebook-converter");

async function storeImage(subloc, data, fileName) {
  // Define the directory for uploaded images
  const uploadDir = path.join(process.cwd(), `/assets/${subloc}`);

  // Ensure the directory exists
  fs.mkdirSync(uploadDir, { recursive: true });

  // Define the path for the new image
  const dataPath = path.join(uploadDir, `${fileName}.png`);

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

  // Ensure the directory exists
  fs.mkdirSync(uploadDir, { recursive: true });

  // Define the path for the new image
  const dataPath = path.join(uploadDir, `${fileName}.mp3`);

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
  // Ensure the directory exists
  fs.mkdirSync(uploadDir, { recursive: true });

  const fileName = id + ".png";

  const imagePath = path.join(uploadDir, fileName);

  const url = `https://b9dk2wds-5000.use.devtunnels.ms/assets/SongLogo/${fileName}`;

  let img = fs.readFileSync(imagePath, { encoding: "base64" });

  return url;
}

async function retrieveAudio(subloc, id) {
  // Define the directory for uploaded images
  const uploadDir = path.join(process.cwd(), `/assets/${subloc}`);
  // Ensure the directory exists
  fs.mkdirSync(uploadDir, { recursive: true });

  const fileName = id + ".mp3";

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

  // Convert pdf to epub
  const convertedData = await convertPDFtoEPUB(data, dataPath);

}

async function retrieveEPUB(subloc, id) {}

async function convertPDFtoEPUB(data, dataPath) {
  return new Promise((resolve, reject) => {
    ebookConverter
      .convert({
        input: `./input/${data}.pdf`,
        output: `${dataPath}`,
        authors: "Test content",
      })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
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
