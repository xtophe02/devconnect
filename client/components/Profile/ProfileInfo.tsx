import React from "react";
import { Skills } from "./Skills";
import { ProfileItem } from "./ProfileItem";
import { EDITPROFILE } from "../../src/queries";
import { useMutation } from "@apollo/client";
import { Upload } from "../Upload";
import { useRouter } from "next/router";
// import {cache } from '../../apollo/cache'

const objDiff = (o1, o2) => {
  let diff = Object.keys(o2).reduce((diff, key) => {
    if (o1[key] === o2[key]) return diff;
    return {
      ...diff,
      [key]: o2[key],
    };
  }, {});
  return diff;
};

export const ProfileInfo = ({ profile }) => {
  const router = useRouter();
  const initValues = { ...profile, ["skills"]: profile.skills.join(", ") };
  const [edit, setEdit] = React.useState(false);
  const [state, setState] = React.useState(initValues);
  const [editProfile, { loading }] = useMutation(EDITPROFILE, {
    onCompleted: () => router.reload(),
  });
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
  const handleFile = ({
    target: {
      validity,
      files: [file],
    },
  }) => validity.valid && setState((prev) => ({ ...prev, ["avatar"]: file }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    let onlyDiff = objDiff(initValues, state);

    if (onlyDiff.skills) {
      onlyDiff = {
        ...onlyDiff,
        skills: onlyDiff.skills.split(" ").join("").split(","),
      };
    }

    try {
      await editProfile({
        variables: {
          data: {
            ...onlyDiff,
          },
        },
      });
      setEdit(!edit);
    } catch (error) {
      console.log(error);
    }
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
                <div className="buttons are-small">
                  <button
                    className={`button is-primary  ${loading && "is-loading"}`}
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
                  <div
                    className="button is-danger is-light"
                    onClick={() => setEdit(!edit)}
                  >
                    Cancel
                  </div>
                </div>
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
                <Skills
                  skills={state.skills}
                  edit={edit}
                  name="skills"
                  handleChange={handleChange}
                />
              </td>
            </tr>
            {edit && (
              <tr>
                <td>
                  <span className="icon">
                    <i className="fas fa-portrait"></i>
                  </span>
                </td>
                <td>
                  <Upload
                    handleFile={handleFile}
                    avatar={state.avatar}
                    edit={edit}
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
