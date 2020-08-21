import { Container, Typography, Box } from "@material-ui/core";
import Link from "../src/Link";
import { useQuery } from "@apollo/client";
import { HELLO } from "../src/queries";
import { Layout } from "../components/";

export default function Home() {
  const { data, error, loading } = useQuery(HELLO);
  return (
    <Layout title={data && data.hello}>
      <Link href="/about" color="secondary">
        Go to the about page
      </Link>
    </Layout>
  );
}
