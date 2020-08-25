import React from "react";
import { InputForm } from "./InputForm";
import { Upload } from "./Upload";
import { ButtonsSubmit } from "./ButtonsSubmit";
import { useMutation, gql } from "@apollo/client";

const initValues = {
  name: "",
  username: "",
  location: "",
  avatar: "",
  skills: [],
  githubUsername: "",
  social: {
    facebook: "",
    linkedin: "",
  },
};
const CREATEPROFILE = gql`
  mutation CREATEPROFILE($data: CreateProfileInput) {
    createProfile(data: $data) {
      success
      data {
        userId {
          email
          profile {
            username
          }
        }
        username
        social {
          facebook
        }
      }
      error {
        message
      }
    }
  }
`;
const Profile = ({ profile, flag, setFlag }) => {
  //add reducer

  const [state, setState] = React.useState(profile ? profile : initValues);
  // const [file, setFile] = React.useState(profile.avatar);
  const [createProfile, { data, loading, error }] = useMutation(CREATEPROFILE, {
    onCompleted: () => setFlag(!flag),
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState((prev) => {
      if (name === "skills") {
        return { ...prev, [name]: value.split(",") };
      }
      if (name === "linkedin" || name === "facebook") {
        return { ...prev, social: { ...prev.social, [name]: value } };
      }
      return { ...prev, [name]: value };
    });
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
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <InputForm
        placeholder="Your name"
        icon="far fa-id-card"
        value={state ? state.name : ""}
        handleChange={handleChange}
        name="name"
      />
      <Upload handleFile={handleFile} file={state ? state.avatar : ""} />
      <InputForm
        placeholder="Username of your choice"
        icon="far fa-user"
        value={state ? state.username : ""}
        handleChange={handleChange}
        name="username"
      />
      <InputForm
        placeholder="Where do you leave"
        icon="fas fa-map-marker-alt"
        value={state ? state.location : ""}
        handleChange={handleChange}
        name="location"
      />

      <InputForm
        placeholder='Your web-developement skills seperated by commas ","'
        icon="fas fa-user-cog"
        value={state ? state.skills : ""}
        handleChange={handleChange}
        name="skills"
      />
      <InputForm
        placeholder="Github username"
        icon="fab fa-github"
        value={state ? state.githubUsername : ""}
        handleChange={handleChange}
        name="githubUsername"
      />
      <InputForm
        placeholder="Facebook username"
        icon="fab fa-facebook-square"
        type="url"
        value={state && state.social ? state.social.facebook : ""}
        handleChange={handleChange}
        name="facebook"
      />
      <InputForm
        placeholder="LinkedIn username"
        icon="fab fa-linkedin"
        type="url"
        value={state && state.social ? state.social.linkedin : ""}
        handleChange={handleChange}
        name="linkedin"
      />
      <ButtonsSubmit />
    </form>
  );
};

export default Profile;
