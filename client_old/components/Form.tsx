import React from "react";
import { InputForm } from "./";

export const Form = ({ values, handleChange }) => {
  const { email, password } = values;

  return (
    <>
      <InputForm
        type="email"
        placeholder="Email"
        icon="fa-envelope"
        value={email}
        name="email"
        handleChange={handleChange}
      />
      <InputForm
        type="password"
        placeholder="Password"
        icon="fa-lock"
        value={password}
        name="password"
        handleChange={handleChange}
      />
    </>
  );
};
