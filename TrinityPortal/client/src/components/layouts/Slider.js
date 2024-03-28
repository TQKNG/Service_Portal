import React, { useEffect } from "react";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
// import VolumeDown from "@mui/icons-material/VolumeDown";
// import VolumeUp from "@mui/icons-material/VolumeUp";

const VolumeController = ({ volume, setFormData, type }) => {
  const [value, setValue] = React.useState(volume);

  useEffect(() => {
    setValue(volume);
  }, [volume]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (type === "Max") {
      setFormData({ ...setFormData, volumeMax: newValue });
    } else {
      setFormData({ ...setFormData, volumeMin: newValue });
    }
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };
  return (
    <>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        {/* <VolumeDown /> */}
        <Slider
          aria-label="Volume"
          value={value}
          onChange={handleChange}
          color="success"
          sx={{
            "& .MuiSlider-track": {
              backgroundColor: "#1ba587",
            },
            "& .MuiSlider-thumb": {
              backgroundColor: "#1ba587",
            },
          }}
        />
      </Stack>
    </>
  );
};

export default VolumeController;
