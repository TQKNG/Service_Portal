import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = ({ instructionText, imgSrc,setFormData }) => {
  const [fileName, setFileName] = React.useState("");

  const onDrop = useCallback((acceptedFiles, event) => {
    if (acceptedFiles.length > 0) {
      setFileName(acceptedFiles[0].name);

      //   // Read file data
        const reader = new FileReader();
        reader.onload = () => {
          // Update image file in state
          setFormData((prevFormData) => ({
            ...prevFormData,
            fileData: reader.result,
            fileName: acceptedFiles[0].name,
          }));
        };
        reader.readAsDataURL(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
                    <div>
                     {instructionText}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        {/* <img
          //src={process.env.PUBLIC_URL + `/images/${CategoryID}.png`} // Old logic: Use static img from public folder cant dynamically change
          src={`data:image/png;base64,${instructionImg}`}
          alt=""
          srcset=""
        /> */}

      </div>
    </>
  );
};

export default FileUpload;
