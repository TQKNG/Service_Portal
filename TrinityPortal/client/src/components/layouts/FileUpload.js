import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = ({ instructionText, imgSrc, setFormData, formData, fieldType }) => {
  const [fileName, setFileName] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  // On drop handler
  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles, event) => {
      if (rejectedFiles.length > 0) {
        setErrorMessage("Invalid file format or size");
      }

      if (acceptedFiles.length > 0) {
        setFileName(acceptedFiles[0].name);
        //   // Read file data

        // Validate file type
        if (
          !acceptedFiles[0].type.includes("image") &&
          !acceptedFiles[0].type.includes("audio")
        ) {
          setErrorMessage("Unsupported file type");
          return;
        } else if (
          !acceptedFiles[0].type.includes("image") &&
          fieldType === "image"
        ) {
          setErrorMessage("Should be image");
          return;
        } else if (
          !acceptedFiles[0].type.includes("audio") &&
          fieldType === "audio"
        ) {
          setErrorMessage("Should be audio");
          return;
        }

        // Validate file size
        const maxSizeInBytes = 10 * 1024 * 1024; // 10 MB
        if (acceptedFiles[0].size > maxSizeInBytes) {
          setErrorMessage("File size exceeds 10MB limit");
          return;
        }

        // Pass validation set null error message
        setErrorMessage("");

        // Add content to form data
        const reader = new FileReader();
        reader.onload = () => {
          if (acceptedFiles[0].type.includes("image")) {
            setFormData((prevFormData) => ({
              ...prevFormData,
              SongLogo: reader.result,
            }));
          } else {
            setFormData((prevFormData) => ({
              ...prevFormData,
              SongData: reader.result,
            }));
          }
        };
        reader.readAsDataURL(acceptedFiles[0]);
      }
    },
    [setFormData]
  );

  // Package functions
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ["audio/mpeg", "image/png"],
    onDrop,
  });

  return (
    <>
      <div class="w-100 text-center">
        {/* Upload Image Area */}
        <div className="d-flex justify-content-end">
          <div
            className="w-100 p-3 border border-primary rounded "
            {...getRootProps({
              onClick: (event) => console.log(event),
              role: "button",
              "aria-label": "drag and drop area",
            })}
          >
            <input {...getInputProps()} />
            <div className="d-flex flex-column align-items-center gap-2">
              {imgSrc}
              {fileName ? (
                <>
                  <div>{fileName}</div>
                </>
              ) : (
                <>
                  {isDragActive ? (
                    <div>Drop your song here ...</div>
                  ) : (
                    <div>{instructionText}</div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>


       

        <div>
          {errorMessage && <div className="text-danger">{errorMessage}</div>}
        </div>
      </div>
    </>
  );
};

export default FileUpload;
