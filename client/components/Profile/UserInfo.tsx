import React from "react";

export const UserInfo = ({ data }) => {
  const { email, role, invitations, createdAt } = data;
  return (
    <>
      <div className="title is-4">User Info</div>

      <div className="content">
        <table className="table is-narrow">
          <tbody>
            <tr>
              <td>
                <span className="icon">
                  <i className="fas fa-envelope"></i>
                </span>
              </td>
              <td>{email}</td>
            </tr>
            <tr>
              <td>
                <span className="icon">
                  <i className="fas fa-user-tag"></i>
                </span>
              </td>
              <td>{role}</td>
            </tr>
            <tr>
              <td>
                <span className="icon">
                  <i className="fas fa-list-ol"></i>
                </span>
              </td>
              <td>{invitations}</td>
            </tr>
            <tr>
              <td>
                <span className="icon">
                  <i className="fas fa-calendar"></i>
                </span>
              </td>
              <td>{createdAt.split("T")[0]}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
