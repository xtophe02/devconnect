import React from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const HELLO2 = gql`
  query Hello {
    hello2
  }
`;
const About = () => {
  const [loadRes, { loading, error, data }] = useLazyQuery(HELLO2);

  return (
    <>
      <button onClick={() => loadRes()}>Submit</button>
      <div>{data && data.hello2}</div>
    </>
  );
};

export default About;
