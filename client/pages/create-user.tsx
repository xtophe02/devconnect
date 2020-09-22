import React from "react";
import { Layout, ProfileForm } from "../components";
import { useMutation } from "@apollo/client";
import { CREATEPROFILE } from "../src/queries";
import { useRouter } from "next/router";

const initValues = {
  name: "",
  username: "",
  location: "",
  avatar: "",
  skills: "",
  githubUsername: "",
  social: { facebook: "", linkedin: "" },
};
const createUser = () => {
  const router = useRouter();
  const [createProfile, { loading }] = useMutation(CREATEPROFILE, {
    onCompleted: () => router.push("/profile"),
  });
  const [state, setState] = React.useState(initValues);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "facebook" || name === "linkedin") {
      return setState((prev) => ({
        ...prev,
        social: { ...prev.social, [name]: value },
      }));
    }

    setState((prev) => ({ ...prev, [name]: value }));
  };
  const handleFile = ({
    target: {
      validity,
      files: [file],
    },
  }) => validity.valid && setState((prev) => ({ ...prev, ["avatar"]: file }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createProfile({
        variables: {
          data: {
            ...state,
            skills: state.skills.split(" ").join("").split(","),
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title="Create User">
      <form onSubmit={handleSubmit}>teste</form>
    </Layout>
  );
};

export default createUser;
