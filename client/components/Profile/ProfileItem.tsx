import React from "react";

export const ProfileItem = ({ text, edit, handleEdit }) => {
  return (
    <tr>
      <td>
        <span className="icon">
          <i className="fas fa-signature"></i>
        </span>
      </td>
      {edit ? (
        <div className="field">
          <div className="control has-icons-right">
            <input
              className="input"
              type="text"
              placeholder="Text input"
              value={text}
            />
            <a>
              <span className="icon is-small is-right">
                <i className="fas fa-check"></i>
              </span>
            </a>
          </div>
        </div>
      ) : (
        <>
          <td>{text}</td>
          <td>
            <button className="button is-small is-text" onClick={handleEdit}>
              <span className="icon">
                <i className="fas fa-pencil-alt"></i>
              </span>
            </button>
          </td>
        </>
      )}
    </tr>
  );
};
