import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

const Loader = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      mt: 5,
    }}
  >
    <CircularProgress color="primary" />
    <Typography sx={{ mt: 2 }}>Loading transactions...</Typography>
  </Box>
);

export default Loader;
