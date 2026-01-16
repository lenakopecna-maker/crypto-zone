import { Box, Typography } from "@mui/material"; 
import axios from "axios";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    try {
      const { data } = await axios.get(TrendingCoins(currency));
      setTrending(data);
    } catch (error) {
      console.error("Error fetching trending coins:", error);
    }
  };

  useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;

    return (
      <Link
        to={`/coins/${coin.id}`}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
          textTransform: "uppercase",
          color: "white",
        }}
        key={coin.id}
      >
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        
        <Typography component="span">
          {coin?.symbol}
          &nbsp;
          <Box
            component="span"
            sx={{
              color: profit ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {/* Percentage Localization for Czech vs English */}
            {currency === "CZK" ? (
              <>
                {coin?.price_change_percentage_24h?.toLocaleString("cs-CZ", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })} %
              </>
            ) : (
              <>
                {coin?.price_change_percentage_24h?.toFixed(2)}%
              </>
            )}
          </Box>
        </Typography>

        {/* Price Localization: Proper separators and "small č" formatting */}
        <Typography 
            component="span" 
            sx={{ 
                fontSize: 22, 
                fontWeight: 500,
                color: "white" 
            }}
        >
          {currency === "CZK" ? (
            <>
              {coin?.current_price.toLocaleString("cs-CZ", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              K<small style={{ fontSize: "0.75em", fontWeight: 700 }}>č</small>
            </>
          ) : (
            <>
              {symbol} {coin?.current_price.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </>
          )}
        </Typography>
      </Link>
    );
  });

  const responsive = {
    0: { items: 2 },
    512: { items: 4 },
  };

  return (
    <Box
      sx={{
        height: "50%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </Box>
  );
};

export default Carousel;