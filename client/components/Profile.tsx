import React from 'react';
import { InputForm } from './InputForm';
import { Upload } from './Upload';
import { ButtonsSubmit } from './ButtonsSubmit';

const Profile = ({ profile }) => {
  //add reducer
  const [state, setState] = React.useState(profile);
  // const [file, setFile] = React.useState(profile.avatar);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState((prev) => {
      if (name === 'skills') {
        console.log([name]);
        // return { ...prev, [name]: [name].push(value) };
      }
      if (name === 'linkedin' || name === 'facebook') {
        return { ...prev, social: { [name]: value } };
      }
      return { ...prev, [name]: value };
    });
  };
  const handleFile = ({
    target: {
      validity,
      files: [file],
    },
  }) => validity.valid && setState((prev) => ({ ...prev, ['avatar']: file }));
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
  };
  return (
    <form onSubmit={handleSubmit}>
      <InputForm
        placeholder='Your name'
        icon='far fa-id-card'
        value={state ? state.name : ''}
        handleChange={handleChange}
        name='name'
      />
      <Upload handleFile={handleFile} file={state.avatar} />
      <InputForm
        placeholder='Username of your choice'
        icon='far fa-user'
        value={state ? state.username : ''}
        handleChange={handleChange}
        name='username'
      />
      <InputForm
        placeholder='Where do you leave'
        icon='fas fa-map-marker-alt'
        value={state ? state.location : ''}
        handleChange={handleChange}
        name='location'
      />

      <InputForm
        placeholder='Your web-developement skills seperated by commas ","'
        icon='fas fa-user-cog'
        value={state ? state.skills : ''}
        handleChange={handleChange}
        name='skills'
      />
      <InputForm
        placeholder='Github username'
        icon='fab fa-github'
        value={state ? state.githubUsername : ''}
        handleChange={handleChange}
        name='githubUsername'
      />
      <InputForm
        placeholder='Facebook username'
        icon='fab fa-facebook-square'
        value={state ? state.social.facebook : ''}
        handleChange={handleChange}
        name='facebook'
      />
      <InputForm
        placeholder='LinkedIn username'
        icon='fab fa-linkedin'
        value={state ? state.social.linkedin : ''}
        handleChange={handleChange}
        name='linkedin'
      />
      <ButtonsSubmit />
    </form>
  );
};

export default Profile;
