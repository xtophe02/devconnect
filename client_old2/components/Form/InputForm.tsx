import React from "react";
import { capitalize } from "../../utils/capitalize";

export const InputForm = ({
  type,
  placeholder,
  icon,
  value,
  name,
  handleChange,
}) => {
  // const [fasIcon, setFasIcon] = React.useState("fas fa-eye-slash");
  return (
    <div className="field">
      <label className="label">{capitalize(name)}</label>
      <p className="control has-icons-left">
        <input
          className="input"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          name={name}
        />
        <span className="icon is-small is-left">
          <i className={`fas ${icon}`}></i>
        </span>
      </p>
    </div>
  );
};
