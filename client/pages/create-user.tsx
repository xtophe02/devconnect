import React from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useRouter } from "next/router";
import { Roles } from "@cmdevconnect/common";
import { Layout, Form, ButtonsSubmit } from "../components";
import { capitalize } from "../utils/capitalize";

const CREATEUSER = gql`
  mutation CREATEUSER($data: CreateUserInput) {
    createUser(data: $data) {
      success
      error {
        message
        status
      }
    }
  }
`;

const SignUp = () => {
  console.log("SIGNUP FIRED");
  const router = useRouter();
  const [flag, setFlag] = React.useState(false);
  //useReducer
  const [state, setState] = React.useState({
    email: "christophe.moreira@outlook.com",
    password: "password",
    role: Roles.User,
  });
  const [createUser, { data, error }] = useMutation(CREATEUSER, {
    // onCompleted: (data) => console.log(data),
    onCompleted: () => router.push("/"),
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  const selectChange = (e) => {
    setState({ ...state, role: e.target.value });
  };
  // const handleFile = ({
  //   target: {
  //     validity,
  //     files: [file],
  //   },
  // }) => {
  //   if (validity.valid) {
  //     setState({ ...state, avatar: file });
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser({
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
    <Layout title="Sign Up">
      <div className="columns">
        <div className="column"></div>
        <div className="column is-three-quarters">
          <form onSubmit={handleSubmit}>
            <Form values={state} handleChange={handleChange} />
            <div className="field">
              <label className="label">Role</label>
              <div className="control">
                <div className="select">
                  <select onChange={selectChange} value={state.role}>
                    <option value={Roles.Admin}>
                      {capitalize(Roles.Admin)}
                    </option>
                    <option value={Roles.Manager}>
                      {capitalize(Roles.Manager)}
                    </option>
                    <option defaultValue={Roles.User}>
                      {capitalize(Roles.User)}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <ButtonsSubmit />
          </form>
          {error && JSON.stringify(error)}
        </div>

        <div className="column"></div>
      </div>
    </Layout>
  );
};

export default SignUp;
