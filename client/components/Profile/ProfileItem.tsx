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
        <>
          <td>
            <input type="text" className="input" value={text} />
          </td>
          <td>
            <div class="buttons has-addons">
              <button class="button is-small">Y</button>

              <button class="button is-small">N</button>
            </div>
          </td>
        </>
      ) : (
        <>
          <td>{text}</td>

          <td>
            <button
              className="button is-small is-text"
              onClick={() => handleEdit(!edit)}
            >
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
