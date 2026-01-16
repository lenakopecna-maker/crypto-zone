import React, { createContext, useContext, useEffect, useState } from "react";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  // Set default to CZK and removed INR
  const [currency, setCurrency] = useState("CZK");
  const [symbol, setSymbol] = useState("Kč");

  useEffect(() => {
    if (currency === "CZK") setSymbol("Kč");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  // Modern 2026 Formatting Function
  // This ensures Czech numbers use spaces as separators and commas for decimals
  const formatPrice = (price) => {
    if (currency === "CZK") {
      return new Intl.NumberFormat("cs-CZ", {
        style: "currency",
        currency: "CZK",
      }).format(price);
    } else {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);
    }
  };

  return (
    <Crypto.Provider value={{ currency, setCurrency, symbol, formatPrice }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};