import "../styles/globals.css";
import type { AppProps } from "next/app";

// pages/_app.js
import { ChakraProvider, ThemeProvider } from "@chakra-ui/react";
import React from "react";
import { modeContext, useView } from "../context/mode";

function MyApp({ Component, pageProps }: AppProps) {
  const ctx = useView();
  return (
    <ChakraProvider>
      <modeContext.Provider value={ctx}>
        <Component {...pageProps} />
      </modeContext.Provider>
    </ChakraProvider>
  );
}

export default MyApp;
