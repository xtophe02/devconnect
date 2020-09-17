import React from "react";

export const ProfileItem = ({
  value,
  edit,
  name,
  handleChange,
  type = "text",
}) => {
  const mediaSocial = (name, value) => {
    if (name === "facebook") {
      console.log(value);
      return (
        <a href={value} target="_blank">
          {value.split("https://www.facebook.com/")[1]}
        </a>
      );
    }
    if (name === "linkedin") {
      return (
        <a href={value} target="_blank">
          {value.split("https://www.linkedin.com/in/")[1]}
        </a>
      );
    }
    return value;
  };
  return (
    <>
      {edit ? (
        <td>
          <input
            type={type}
            className="input"
            value={value}
            name={name}
            onChange={handleChange}
          />
        </td>
      ) : (
        <td>{mediaSocial(name, value)}</td>
      )}
    </>
  );
};
