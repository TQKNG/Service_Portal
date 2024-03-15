const fs = require("fs");
const path = require("path");

async function storeImage(instructionImg, imgFileName) {
  // Define the directory for uploaded images
  const uploadDir = path.join(process.cwd(), '/assets/instructionImg');

  // Ensure the directory exists
  fs.mkdirSync(uploadDir, { recursive: true });

  //Convert to base 64
  let base64Image = instructionImg.split(";base64,").pop();

  // Define the path for the new image
const imagePath = path.join(uploadDir, imgFileName);
  // Write the image to a file
  fs.writeFile(
    imagePath,
    base64Image,
    { encoding: "base64" },
    function (err) {
      console.log("File created");
    }
  );
}

async function retrieveImage(categoryID){
  // Define the directory for uploaded images
  const uploadDir = path.join(process.cwd(), '/assets/instructionImg');
  // Ensure the directory exists
  fs.mkdirSync(uploadDir, { recursive: true });

  const fileName = categoryID + '.png';

  const imagePath = path.join(uploadDir, fileName);

  let img = fs.readFileSync(imagePath, { encoding: "base64" });

  return img;
}


module.exports = {storeImage, retrieveImage};
