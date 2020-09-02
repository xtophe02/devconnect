import React from "react";
import Link from "next/link";

export const Profile = ({ currentUser }) => {
  const { data } = currentUser;
  console.log(data);
  const { email, role, invitations, createdAt, profile } = data;

  return (
    <div className="tile is-ancestor">
      <div className="tile is-vertical is-8">
        <div className="tile">
          <div className="tile is-parent">
            <article className="tile is-child notification">
              <p className="title">Middle tile</p>
              <p className="subtitle">With an image</p>
              <figure className="image is-4by3">
                <img src="https://bulma.io/images/placeholders/640x480.png" />
              </figure>
            </article>
          </div>
          <div className="tile is-parent is-vertical">
            <article className="tile is-child notification ">
              {/* <p className="title">Vertical...</p> */}
              {/* <p className="subtitle">Top tile</p> */}

              <div className="content">
                <table className="table is-narrow is-striped">
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
            </article>
            <article className="tile is-child notification ">
              <p className="content">
                {!profile
                  ? "...no profile, please to create your profile"
                  : profile}
              </p>
              <div className="buttons has-addons is-right">
                <Link href="/create-profile">
                  <button className="button is-small">Create Profile</button>
                </Link>
              </div>
            </article>
          </div>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child notification ">
            <p className="title">Wide tile</p>
            <p className="subtitle">Aligned with the right tile</p>
            <div className="content">-- Content -</div>
          </article>
        </div>
      </div>
      <div className="tile is-parent">
        <article className="tile is-child notification ">
          <div className="content">
            <p className="title">Followers</p>
            <p className="subtitle">With even more content</p>
            <div className="content">Content</div>
          </div>
        </article>
      </div>
    </div>
  );
};
