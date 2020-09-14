import React from "react";
import { Layout, ProfileForm } from "../components";
import { useMutation } from "@apollo/client";
import { EDITPROFILE } from "../src/queries";
import { useRouter } from "next/router";

// const initValues = {
//   name: "",
//   username: "",
//   location: "",
//   avatar: "",
//   skills: "",
//   githubUsername: "",
//   social: { facebook: "", linkedin: "" },
// };
const editProfile = ({ profile }) => {
  console.log(profile);
  const router = useRouter();
  const [editProfile, { loading, error }] = useMutation(EDITPROFILE, {
    onCompleted: () => {
      // router.push("/profile");
    },
  });
  if (loading) return <p>loading</p>;
  if (error) return <p>ERROR</p>;
  // if (!data) return <p>Not found</p>;
  // const [state, setState] = React.useState(initValues);
  // const handleChange = (e) => {
  //   const name = e.target.name;
  //   const value = e.target.value;

  //   if (name === "facebook" || name === "linkedin") {
  //     return setState((prev) => ({
  //       ...prev,
  //       social: { ...prev.social, [name]: value },
  //     }));
  //   }

  //   setState((prev) => ({ ...prev, [name]: value }));
  // };
  // const handleFile = ({
  //   target: {
  //     validity,
  //     files: [file],
  //   },
  // }) => validity.valid && setState((prev) => ({ ...prev, ["avatar"]: file }));

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     await createProfile({
  //       variables: {
  //         data: {
  //           ...state,
  //           skills: state.skills.split(" ").join("").split(","),
  //         },
  //       },
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <Layout title="Edit Profile">
      {/* <form onSubmit={handleSubmit}>
        <ProfileForm
          state={state}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleFile={handleFile}
          loading={loading}
        />
      </form> */}
    </Layout>
  );
};

export default editProfile;
