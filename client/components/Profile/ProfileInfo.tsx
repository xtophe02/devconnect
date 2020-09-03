import React from "react";
import Link from "next/link";
import { Skills } from "./Skills";

export const ProfileInfo = ({ profile }) => {
  console.log(profile);
  const { name, username, location, githubUsername, skills } = profile;
  return (
    <>
      <div className="title is-4">Profile Info</div>
      <div className="content">
        <table className="table is-narrow ">
          <tbody>
            <tr>
              <td>
                <span className="icon">
                  <i className="fas fa-signature"></i>
                </span>
              </td>
              <td>{name}</td>
            </tr>
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
