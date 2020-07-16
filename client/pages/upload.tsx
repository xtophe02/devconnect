import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Layout } from '../components';
import sharp from 'sharp';

const SINGLEUPLOAD = gql`
  mutation SINGLEUPLOAD($file: Upload) {
    singleUpload(file: $file) {
      url
    }
  }
`;

const upload = () => {
  // const [file, setFile] = React.useState();
  const [singleUpload, { data, error, loading }] = useMutation(SINGLEUPLOAD, {
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
  const showImage = (data, loading) => {
    if (!data) return null;
    if (data && loading) return <p>loading</p>;
    return (
      <figure className='image is-1by1'>
        <img src={data.singleUpload.url} />
      </figure>
    );
  };
  return (
    <Layout>
      <input type='file' onChange={handleUpload} />
      {showImage(data, loading)}
    </Layout>
  );
};

export default upload;
