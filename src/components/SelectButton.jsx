import { Box } from "@mui/material";

const SelectButton = ({ children, selected, onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        border: "1px solid gold",
        borderRadius: 5,
        padding: "10px 20px",
        fontFamily: "Montserrat",
        cursor: "pointer",
        // Dynamic styling based on 'selected' prop
        backgroundColor: selected ? "gold" : "transparent",
        color: selected ? "black" : "white",
        fontWeight: selected ? 700 : 500,
        "&:hover": {
          backgroundColor: "gold",
          color: "black",
        },
        width: "22%",
        textAlign: "center",
        transition: "all 0.3s ease", // Smooth color transition
      }}
    >
      {children}
    </Box>
  );
};

export default SelectButton;