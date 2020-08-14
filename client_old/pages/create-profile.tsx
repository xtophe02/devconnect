import React from "react";
import { Layout } from "../components";
import { gql } from "@apollo/client";
import { initializeApollo } from "../apollo/client";
import Profile from "../components/Profile";
import { create } from "domain";
import { capitalize } from "../utils/capitalize";
import { useRouter } from "next/router";
import { CURRENTUSER } from "./current-user";

const createProfile = () => {
  const apolloClient = initializeApollo();
  // const teste = apolloClient.readQuery({
  //   query: CURRENTUSER,
  //   // variables: allPostsQueryVars,
  // });
  // console.log(teste);
  return (
    <Layout title="to define" subtitle="to defibne">
      aki
    </Layout>
  );
};
// export async function getServerSideProps({ req }) {
//   try {
//     const apolloClient = initializeApollo(req);
//     const { data } = await apolloClient.query({
//       query: CURRENTUSER,
//       // variables: allPostsQueryVars,
//     });

//     return {
//       props: {
//         // initialApolloState: apolloClient.cache.extract(),
//         ...data,
//       },
//       // unstable_revalidate: 1,
//     };
//   } catch (error) {
//     console.log(error);
//   }
// }
export default createProfile;
