import React from "react";
import { InputValue } from "../Common/InputValue";
import { ButtonsSubmit } from "../ButtonsSubmit";

export const LoginForm = ({ state, handleChange, handleSubmit, loading }) => {
  const { email, password } = state;
  return (
    <div className="columns">
      <div className="column"></div>
      <div className="column is-three-quarters">
        <InputValue
          name="email"
          placeholder="e.g. alexsmith@gmail.com"
          value={email}
          handleChange={handleChange}
        />
        <InputValue
          name="password"
          placeholder="Password"
          type="password"
          value={password}
          handleChange={handleChange}
        />
        <ButtonsSubmit handleSubmit={handleSubmit} loading={loading} />
      </div>
      <div className="column"></div>
    </div>
  );
};
