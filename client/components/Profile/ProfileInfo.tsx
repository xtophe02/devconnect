import React from "react";
import Link from "next/link";
import { Skills } from "./Skills";
import { ProfileItem } from "./ProfileItem";

export const ProfileInfo = ({ profile }) => {
  const { name, username, location, githubUsername, skills, social } = profile;
  const [edit, setEdit] = React.useState(false);
  const handleEdit = () => setEdit(!edit);
  return (
    <>
      <div className="title is-4">Profile Info</div>
      <div className="content">
        <table className="table is-narrow ">
          <tbody>
            <ProfileItem text={name} edit={edit} handleEdit={handleEdit} />
            <tr>
              <td>
                <span className="icon">
                  <i className="fas fa-user"></i>
                </span>
              </td>
              <td>{username}</td>
            </tr>
            <tr>
              <td>
                <span className="icon">
                  <i className="fas fa-map-marker-alt"></i>
                </span>
              </td>
              <td>{location}</td>
            </tr>
            <tr>
              <td>
                <span className="icon">
                  <i className="fab fa-github"></i>
                </span>
              </td>
              <td>{githubUsername}</td>
            </tr>
            <tr>
              <td>
                <span className="icon">
                  <i className="fab fa-facebook"></i>
                </span>
              </td>
              <td>
                <a href={social.facebook} target="_blank">
                  {social.facebook.split("https://www.facebook.com/")[1]}
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <span className="icon">
                  <i className="fab fa-linkedin-in"></i>
                </span>
              </td>
              <td>
                <a href={social.linkedin} target="_blank">
                  {social.linkedin.split("https://www.linkedin.com/in/")[1]}
                </a>
              </td>
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
