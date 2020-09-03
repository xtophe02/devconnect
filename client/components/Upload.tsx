import React from "react";

export const Upload = ({ handleFile, avatar }) => {
  return (
    <div className="field">
      <label className="label">Avatar Image</label>
      <div className="control file has-name is-fullwidth">
        <label className="file-label">
          <input
            className="file-input"
            type="file"
            name="resume"
            onChange={handleFile}
          />
          <span className="file-cta">
            <span className="file-icon">
              <i className="fas fa-upload"></i>
            </span>
            <span className="file-label">Choose an Image...</span>
          </span>
          <span className="file-name">{avatar && avatar.name}</span>
        </label>
      </div>
    </div>
  );
};
