import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

// Modern MUI v6 Dark Theme (Simplified)
const darkTheme = createTheme({
  palette: {
    mode: "dark", 
    primary: {
      main: "#fff",
    },
  },
});

function Header() {
  const { currency, setCurrency } = CryptoState();
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            {/* Using sx prop for modern MUI v6 styling */}
            <Typography
              onClick={() => navigate("/")}
              variant="h6"
              sx={{
                flex: 1,
                color: "gold",
                fontFamily: "Montserrat",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Crypto Zone
            </Typography>

            {/* Currency Selector */}
            <Select
              variant="outlined"
              value={currency}
              sx={{ 
                width: 120, // Increased slightly to fit text
                height: 40, 
                marginLeft: 15,
                "& .MuiSelect-select": {
                  fontFamily: "Montserrat",
                }
              }}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD ($)</MenuItem>
              <MenuItem value={"CZK"}>CZK (Kč)</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;