import React from "react";
import NavBar from "./NavBar";
import Title from "./Title";

export const Layout = ({ children, title, subtitle }) => {
  return (
    <>
      <NavBar />
      <Title title={title} subtitle={subtitle} />
      <div className="container">{children}</div>
    </>
  );
};
// export async function getServerSideProps({ req }) {
//   try {
//     const apolloClient = initializeApollo({ test: "sss" });
//     const data = await apolloClient.query({
//       query: CURRENTUSER,
//       // variables: allPostsQueryVars,
//     });
//     console.log("data", data);
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
