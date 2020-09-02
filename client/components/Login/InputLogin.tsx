import React from "react";
import { capitalize } from "../../src/utils/capitalize";

export const InputLogin = ({
  name,
  type = "text",
  placeholder,
  value,
  handleChange,
}) => {
  return (
    <div className="field">
      <label className="label">{capitalize(name)}</label>
      <div className="control">
        <input
          name={name}
          className="input"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChange(e)}
        />
      </div>
    </div>
  );
};
