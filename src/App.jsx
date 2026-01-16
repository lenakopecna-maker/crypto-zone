import { Box } from "@mui/material"; // Replaces makeStyles
import Homepage from "./Pages/HomePage";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Added Routes
import CoinPage from "./Pages/CoinPage";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      {/* Replaced the <div> with a <Box> component.
        The 'sx' prop handles all styling directly and is much faster.
      */}
      <Box
        sx={{
          backgroundColor: "#14161a",
          color: "white",
          minHeight: "100vh",
        }}
      >
        <Header />
        
        {/* In React Router v7, all <Route> tags MUST be inside <Routes>.
          We also use 'element' instead of 'component'.
        */}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;