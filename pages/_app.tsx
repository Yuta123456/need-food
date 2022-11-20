import "../styles/globals.css";
import type { AppProps } from "next/app";

// pages/_app.js
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { RecoilRoot } from "recoil";
import Seo from "../components/Seo";
import { GetServerSideProps } from "next";

type MyAppProps = {
  host: string;
};
export type AppPageProps = Omit<AppProps<MyAppProps>, "pageProps"> & {
  pageProps: MyAppProps;
};
const MyApp = ({ Component, pageProps }: AppPageProps) => {
  return (
    <ChakraProvider>
      <RecoilRoot>
        <Seo host={pageProps.host} />
        <Component {...pageProps} />
      </RecoilRoot>
    </ChakraProvider>
  );
};

export const getServerSideProps: GetServerSideProps<MyAppProps> = async (
  ctx
) => {
  console.log(ctx.req.headers.host);
  return {
    props: {
      host: ctx.req.headers.host || "",
    },
  };
};
export default MyApp;
