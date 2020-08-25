import React from "react";
import { Container } from "semantic-ui-react";
import { Navbar } from "./Navbar";

export const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container>{children}</Container>
    </>
  );
};
