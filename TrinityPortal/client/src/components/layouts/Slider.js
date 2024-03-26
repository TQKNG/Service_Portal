import React from "react";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
// import VolumeDown from "@mui/icons-material/VolumeDown";
// import VolumeUp from "@mui/icons-material/VolumeUp";

const VolumeController = () => {
  const [value, setValue] = React.useState(30);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
        {/* <VolumeUp /> */}
      </Stack>
    </>
  );
};

export default VolumeController;
