import React from "react";

export const ProfileItem = ({
  value,
  edit,
  name,
  handleChange,
  type = "text",
}) => {
  const setValue = (name, value) => {
    if (value === "") {
      return <em>to fill a {name}</em>;
    }
    if (name === "facebook") {
      const splitFacebook = (value) => {
        const newValue = value.split("https://www.facebook.com/")[1];

        if (!newValue) {
          return <em>please to append 'https://www.facebook.com/'</em>;
        }
        return (
          <a href={value} target="_blank">
            {newValue}
          </a>
        );
      };
      return splitFacebook(value);
    }
    if (name === "linkedin") {
      const splitLinkedin = (value) => {
        const newValue = value.split("https://www.linkedin.com/in/")[1];

        if (!newValue) {
          return <em>please to append 'https://www.linkedin.com/in/'</em>;
        }
        return (
          <a href={value} target="_blank">
            {newValue}
          </a>
        );
      };
      return splitLinkedin(value);
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
        <td>{setValue(name, value)}</td>
      )}
    </>
  );
};
