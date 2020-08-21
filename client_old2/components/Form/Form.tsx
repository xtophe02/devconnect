import React from "react";
import { InputForm } from "./InputForm";
import { ButtonsSubmit } from "./ButtonsSubmit";

export const Form = ({ values, handleChange, loading, profile = false }) => {
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
      {profile && (
        <>
          <InputForm
            type="text"
            placeholder="Name"
            icon="fa-user"
            value=""
            name="name"
            handleChange={handleChange}
          />
        </>
      )}
      <ButtonsSubmit loading={loading} />
    </>
  );
};
