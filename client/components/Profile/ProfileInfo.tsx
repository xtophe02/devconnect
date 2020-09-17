import React from "react";
import { Skills } from "./Skills";
import { ProfileItem } from "./ProfileItem";

export const ProfileInfo = ({ profile }) => {
  const { name, username, location, githubUsername, skills, social } = profile;

  const [edit, setEdit] = React.useState(false);
  const [state, setState] = React.useState(profile);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "facebook" || name === "linkedin") {
      return setState((prev) => ({
        ...prev,
        social: { ...prev.social, [name]: value },
      }));
    }

    setState((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <div className="title is-4">
        <div className="level">
          <div className="level-left">
            <div className="level-item">Profile Info</div>
          </div>
          <div className="level-right">
            <div className="level-item">
              {edit ? (
                <button
                  className="button is-primary"
                  onClick={() => setEdit(!edit)}
                >
                  Save
                </button>
              ) : (
                <button
                  className="button is-text"
                  onClick={() => setEdit(!edit)}
                >
                  <span className="icon">
                    <i className="fas fa-pencil-alt"></i>
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <table className="table is-narrow ">
          <tbody>
            <tr>
              <td>
                <span className="icon">
                  <i className="fas fa-signature"></i>
                </span>
              </td>
              <ProfileItem
                edit={edit}
                value={state.name}
                name="name"
                handleChange={handleChange}
              />
            </tr>

            <tr>
              <td>
                <span className="icon">
                  <i className="fas fa-user"></i>
                </span>
              </td>
              <ProfileItem
                edit={edit}
                value={state.username}
                name="username"
                handleChange={handleChange}
              />
            </tr>
            <tr>
              <td>
                <span className="icon">
                  <i className="fas fa-map-marker-alt"></i>
                </span>
              </td>
              <ProfileItem
                edit={edit}
                value={state.location}
                name="location"
                handleChange={handleChange}
              />
            </tr>
            <tr>
              <td>
                <span className="icon">
                  <i className="fab fa-github"></i>
                </span>
              </td>
              <ProfileItem
                edit={edit}
                value={state.githubUsername}
                name="githubUsername"
                handleChange={handleChange}
              />
            </tr>
            <tr>
              <td>
                <span className="icon">
                  <i className="fab fa-facebook"></i>
                </span>
              </td>
              {/* <td>
                <a href={social.facebook} target="_blank">
                  {social.facebook.split("https://www.facebook.com/")[1]}
                </a>
              </td> */}
              <ProfileItem
                edit={edit}
                value={state.social.facebook}
                name="facebook"
                handleChange={handleChange}
                type="url"
              />
            </tr>
            <tr>
              <td>
                <span className="icon">
                  <i className="fab fa-linkedin-in"></i>
                </span>
              </td>
              {/* <td>
                <a href={social.linkedin} target="_blank">
                  {social.linkedin.split("https://www.linkedin.com/in/")[1]}
                </a>
              </td> */}
              <ProfileItem
                edit={edit}
                value={state.social.linkedin}
                name="linkedin"
                handleChange={handleChange}
              />
            </tr>
            <tr>
              <td>
                <span className="icon">
                  <i className="fas fa-cogs"></i>
                </span>
              </td>
              <td className="is-small">
                <Skills skills={skills} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
