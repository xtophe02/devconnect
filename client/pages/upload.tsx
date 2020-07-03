import React from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const SINGLEUPLOAD = gql`
  mutation SINGLEUPLOAD($file: Upload) {
    singleUpload(file: $file) {
      filename
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
      singleUpload({
        variables: {
          file: file,
        },
      }).catch((err) => console.log(err));
    }
  };
  return (
    <div>
      <input type="file" onChange={handleUpload} />
    </div>
  );
};

export default upload;
