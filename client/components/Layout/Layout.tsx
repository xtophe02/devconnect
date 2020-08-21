import { Container, Typography, Box } from "@material-ui/core";
import NavBar from "./NavBar";

export const Layout = ({ children, title = "to set" }) => {
  return (
    <>
      <NavBar />
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            {title}
          </Typography>
          {children}
        </Box>
      </Container>
    </>
  );
};
