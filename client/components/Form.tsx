import React from 'react';
import { InputForm } from './';

export const Form = ({ values, handleChange }) => {
  const { email, name, password, username } = values;

  return (
    <>
      <InputForm
        type='text'
        placeholder='Name'
        icon='fa-user'
        value={name}
        name='name'
        handleChange={handleChange}
      />
      <InputForm
        type='username'
        placeholder='Username'
        icon='fa-id-badge'
        value={username}
        name='username'
        handleChange={handleChange}
      />
      <InputForm
        type='email'
        placeholder='Email'
        icon='fa-envelope'
        value={email}
        name='email'
        handleChange={handleChange}
      />
      <InputForm
        type='password'
        placeholder='Password'
        icon='fa-lock'
        value={password}
        name='password'
        handleChange={handleChange}
      />
    </>
  );
};
