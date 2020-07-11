import React from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Layout } from "../components";

const SINGLEUPLOAD = gql`
  mutation SINGLEUPLOAD($file: Upload) {
    singleUpload(file: $file) {
      url
    }
  }
`;

const upload = () => {
  // const [file, setFile] = React.useState();
  const [singleUpload, { data, error }] = useMutation(SINGLEUPLOAD, {
    onCompleted: (data) => console.log(data),
  });
  const handleUpload = ({
    target: {
      validity,
      files: [file],
    },
  }) => {
    if (validity.valid) {
      // setFile(file);
      console.log(file);
      singleUpload({
        variables: {
          file: file,
        },
      }).catch((err) => console.log(err));
    }
  };
  return (
    <Layout>
      <input type="file" onChange={handleUpload} />
      {/* <img
        src="http://devconnect.dev/flyimg/upload/w_200/https://images.unsplash.com/photo-1594312180721-3b5217cfc65f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        alt=""
      /> */}
      {/* <img
        src="http://flyimg-srv/flyimg/upload/w_200/https://images.unsplash.com/photo-1594312180721-3b5217cfc65f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        alt=""
      /> */}
    </Layout>
  );
};

export default upload;
