import React from "react";
import TransactionsPage from "./pages/TransactionsPage";
import {
  Container,
  Typography,
  CssBaseline,
  AppBar,
  Toolbar,
  Box,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

function App() {
  return (
    <>
      <CssBaseline />
      <AppBar position="sticky" color="primary" enableColorOnDark>
        <Toolbar>
          <EmojiEventsIcon sx={{ mr: 1 }} />
          <Typography variant="h6">Retailer Rewards Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ bgcolor: "#f9fafc", minHeight: "100vh", py: 4 }}>
        <Container maxWidth="lg">
          <TransactionsPage />
        </Container>
      </Box>
    </>
  );
}

export default App;
