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
      const splitFacebook = (value) => {
        const newValue = value.split("https://www.facebook.com/")[1];

        if (!newValue) {
          return <em>please to append 'https://www.facebook.com/'</em>;
        }
        return newValue;
      };
      return (
        <a href={value} target="_blank">
          {splitFacebook(value)}
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
