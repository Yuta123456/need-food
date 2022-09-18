import "../styles/globals.css";
import type { AppProps } from "next/app";

// pages/_app.js
import { ChakraProvider, ThemeProvider } from "@chakra-ui/react";
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
