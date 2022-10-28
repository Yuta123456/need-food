import "../styles/globals.css";
import type { AppProps } from "next/app";

// pages/_app.js
import { ChakraProvider, ThemeProvider } from "@chakra-ui/react";
import React from "react";
import { RecoilRoot } from "recoil";
import Seo from "../components/Seo";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </ChakraProvider>
  );
}

export default MyApp;
