import React from "react";
import { InputValue } from "../Common/InputValue";
import { ButtonsSubmit } from "../ButtonsSubmit";
import { Upload } from "../Upload";

export const ProfileForm = ({
  state,
  handleChange,
  handleSubmit,
  loading,
  handleFile,
}) => {
  const {
    name,
    username,
    location,
    skills,
    githubUsername,
    social,
    avatar,
  } = state;

  return (
    <div className="columns">
      <div className="column"></div>
      <div className="column is-three-quarters">
        <InputValue
          name="name"
          placeholder="e.g. Alex Smith"
          value={name}
          handleChange={handleChange}
        />
        <InputValue
          name="username"
          placeholder="e.g. alexsmith"
          value={username}
          handleChange={handleChange}
        />
        <Upload handleFile={handleFile} avatar={avatar} />
        <InputValue
          name="location"
          placeholder="Where are you come from"
          value={location}
          handleChange={handleChange}
        />
        <InputValue
          name="githubUsername"
          placeholder="Your GiHub username"
          value={githubUsername}
          handleChange={handleChange}
        />
        <InputValue
          name="skills"
          placeholder="e.g. html, javaScript, css, phyton"
          value={skills}
          handleChange={handleChange}
        />
        <InputValue
          type="url"
          name="facebook"
          placeholder="e.g. https://www.facebook.com/christophe.moreira.165"
          value={social.facebook}
          handleChange={handleChange}
        />
        <InputValue
          type="url"
          name="linkedin"
          placeholder="e.g. https://www.linkedin.com/in/christophe-moreira-15aa7551/"
          value={social.linkedin}
          handleChange={handleChange}
        />

        <ButtonsSubmit handleSubmit={handleSubmit} loading={loading} />
      </div>
      <div className="column"></div>
    </div>
  );
};
