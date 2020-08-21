import React from "react";
import { Container, Typography, Box, Button } from "@material-ui/core";

import Link from "../src/Link";
import { Layout } from "../components";

export default function About() {
  return (
    <Layout title="sm">
      <Button
        variant="contained"
        color="primary"
        component={Link}
        naked
        href="/"
      >
        Go to the main page
      </Button>
    </Layout>
  );
}
