const fs = require("fs");
const path = require("path");

async function storeImage(subloc, data, fileName) {
  // Define the directory for uploaded images
  const uploadDir = path.join(process.cwd(), `/assets/${subloc}`);

  // Ensure the directory exists
  fs.mkdirSync(uploadDir, { recursive: true });

  // Define the path for the new image
  const dataPath = path.join(uploadDir, fileName);
  
  //Logic to processing different type of file
  if (subloc === "Image") {
    //Convert to base 64
    let base64Data = data.split(";base64,").pop();
    fs.writeFile(dataPath, base64Data, { encoding: "base64" }, function (err) {
      if (err) {
        console.error("Error creating image file:", err);
      } else {
        console.log("Image file created successfully");
      }
    });
  } else if (subloc === "Map") {
    fs.writeFile(dataPath,JSON.stringify(data, null,2), function(err){
      if (err) {
        console.error("Error creating JSON file:", err);
      } else {
        console.log("JSON file created successfully");
      }
    })
  }
}

async function retrieveImage(subloc, categoryID) {
  // Define the directory for uploaded images
  const uploadDir = path.join(process.cwd(), "/assets/instructionImg");
  // Ensure the directory exists
  fs.mkdirSync(uploadDir, { recursive: true });

  const fileName = categoryID + ".png";

  const imagePath = path.join(uploadDir, fileName);

  let img = fs.readFileSync(imagePath, { encoding: "base64" });

  return img;
}

module.exports = { storeImage, retrieveImage };
