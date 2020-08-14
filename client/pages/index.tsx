import { useQuery } from "@apollo/client";
import { HELLO, CURRENTUSER } from "../queries";
import { initializeApollo } from "../apollo/client";
import { Layout, PostList } from "../components";

const IndexPage = (props) => {
  // const { data, error, loading } = useQuery(HELLO);

  // if (loading) return "loading";
  return (
    <Layout>
      {/* {data.hello} */}
      <PostList />
      {/* {error && JSON.stringify(error)} */}
    </Layout>
  );
};
// export async function getStaticProps() {
//   const apolloClient = initializeApollo();

//   const { data } = await apolloClient.query({
//     query: HELLO,
//     // variables: allPostsQueryVars,
//   });
//   // console.log(apolloClient.cache.data);
//   console.log(data);
//   return {
//     props: {
//       initialApolloState: apolloClient.cache.extract(),
//     },
//     // unstable_revalidate: 1,
//   };
// }
// export async function getServerSideProps({ req }) {
//   try {
//     const apolloClient = initializeApollo(req);
//     const teste = await apolloClient.query({
//       query: CURRENTUSER,
//       // variables: allPostsQueryVars,
//     });
//     console.log(teste);
//     return {
//       props: {
//         // initialApolloState: apolloClient.cache.extract(),
//         // ...data,
//         ste: "sadas",
//       },
//       // unstable_revalidate: 1,
//     };
//   } catch (error) {
//     console.log(error);
//   }
//   return { props: { ste: "sadas" } };
// }
export default IndexPage;
