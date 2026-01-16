import { Container, Typography, Box } from "@mui/material"; // Replaces @material-ui/core
import Carousel from "./Carousel";

function Banner() {
  return (
    // Replaces classes.banner
    <Box
      sx={{
        backgroundImage: "url(/banner2.jpg)", // Vite serves public folder from /
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* Replaces classes.bannerContent */}
      <Container
        sx={{
          height: 400,
          display: "flex",
          flexDirection: "column",
          paddingTop: 3.125, // 25px / 8px = 3.125 (theme spacing)
          justifyContent: "space-around",
        }}
      >
        {/* Replaces classes.tagline */}
        <Box
          sx={{
            display: "flex",
            height: "40%",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              marginBottom: "15px",
              fontFamily: "Montserrat",
            }}
          >
            Crypto Zone
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </Box>

        {/* Carousel handles its own styling internally */}
        <Carousel />
      </Container>
    </Box>
  );
}

export default Banner;