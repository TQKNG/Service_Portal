import React, { useEffect } from "react";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";

const VolumeController = ({ volume, setFormData, type }) => {
  const [value, setValue] = React.useState(volume);

  useEffect(() => {
    setValue(volume);
  }, [volume]);

  const handleChange = (event, newValue) => {
    setValue(newValue);

    if (type === "Min") {
      setFormData((prev) => ({
        ...prev,
        volumeSetting: {
          ...prev.volumeSetting,
          volumeMin: { ...prev.volumeSetting.volumeMin, value: newValue},
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        volumeSetting: {
          ...prev.volumeSetting,
          volumeMax: { ...prev.volumeSetting.volumeMax, value: newValue },
        },
      }));
    }
  };

  return (
    <>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        {/* <VolumeDown /> */}
        <Slider
          aria-label="Volume"
          value={value ? value : 0}
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
