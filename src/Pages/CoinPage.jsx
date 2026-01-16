import { LinearProgress, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../CryptoContext";

// Styled Components for Layout
const StyledContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Sidebar = styled(Box)(({ theme }) => ({
  width: "30%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 25,
  borderRight: "2px solid grey",
}));

const MarketData = styled(Box)(({ theme }) => ({
  alignSelf: "start",
  padding: 25,
  paddingTop: 10,
  width: "100%",
  // Responsive layout for data labels
  [theme.breakpoints.down("md")]: {
    display: "flex",
    flexDirection: "column", // Stacked for cleaner look on tablets
    alignItems: "center",
  },
  [theme.breakpoints.down("sm")]: {
    alignItems: "start",
  },
}));

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const { currency, symbol, formatPrice } = CryptoState();

  const fetchCoin = useCallback(async () => {
    try {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
    } catch (error) {
      console.error("Error fetching coin data:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchCoin();
  }, [fetchCoin, currency]); // Added currency to refresh data if user switches it

  if (!coin) return <LinearProgress sx={{ backgroundColor: "gold" }} />;

  return (
    <StyledContainer>
      <Sidebar>
        <Box
          component="img"
          src={coin?.image.large}
          alt={coin?.name}
          sx={{ height: 200, marginBottom: "20px" }}
        />
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: "bold", 
            marginBottom: "20px", 
            fontFamily: "Montserrat" 
          }}
        >
          {coin?.name}
        </Typography>
        
        <Typography 
          variant="subtitle1" 
          sx={{ 
            width: "100%", 
            fontFamily: "Montserrat", 
            padding: "25px", 
            paddingBottom: "15px", 
            paddingTop: 0, 
            textAlign: "justify" 
          }}
        >
          {/* parse safely converts HTML description from API to React elements */}
          {parse(coin?.description.en.split(". ")[0] || "")}.
        </Typography>

        <MarketData>
          {/* Rank */}
          <Box sx={{ display: "flex", marginBottom: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", fontFamily: "Montserrat" }}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
              {coin?.market_cap_rank}
            </Typography>
          </Box>

          {/* Current Price */}
          <Box sx={{ display: "flex", marginBottom: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", fontFamily: "Montserrat" }}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
              {formatPrice(coin?.market_data.current_price[currency.toLowerCase()])}
            </Typography>
          </Box>

          {/* Market Cap (Cleaned up Millions logic) */}
          <Box sx={{ display: "flex", marginBottom: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", fontFamily: "Montserrat" }}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
              {formatPrice(
                Math.floor(coin?.market_data.market_cap[currency.toLowerCase()] / 1000000)
              )} M
            </Typography>
          </Box>
        </MarketData>
      </Sidebar>

      <CoinInfo coin={coin} />
    </StyledContainer>
  );
};

export default CoinPage;