import React from "react";
import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../apollo/client";
import "../styles/style.sass";

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <>
      <Head>
        <title>DevConnect</title>
        <script
          defer
          src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"
        ></script>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  );
}
