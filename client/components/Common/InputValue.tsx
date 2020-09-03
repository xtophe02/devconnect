import React from "react";
import { capitalize } from "../../src/utils/capitalize";

const helperText = (name) => {
  switch (name) {
    case "skills":
      return <p className="help">separated by commas (,)</p>;
    case "facebook":
      return <p className="help">needs to be an url</p>;
    case "linkedin":
      return <p className="help">needs to be an url</p>;

    default:
      return;
  }
};

export const InputValue = ({
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
      {helperText(name)}
    </div>
  );
};
