import React from "react";
import { capitalize } from "../../utils/capitalize";
import { ButtonsSubmit } from "../Form/ButtonsSubmit";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";

export const Profile = ({ data, loading }) => {
  const router = useRouter();
  return (
    <>
      <article className="media">
        <figure className="media-left">
          <p className="image is-128x128">
            <img src="https://bulma.io/images/placeholders/128x128.png" />
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <table className="table is-striped">
              <tbody>
                {Object.keys(data).map((val) => {
                  if (val === "__typename") return;
                  if (val === "profile") {
                    if (!data[val])
                      return (
                        <tr key={val}>
                          <td>Please to create a profile</td>
                        </tr>
                      );
                  }
                  return (
                    <tr key={val}>
                      <th>{capitalize(val)}</th>
                      <td>{data[val]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {/* <div className="media-right">
        <button className="delete"></button>
      </div> */}
      </article>
      <div className="buttons has-addons is-right">
        <button
          className="button is-info"
          onClick={() => router.push("/create-profile")}
        >
          {!data.profile ? "Create Profile" : "Edit Profile"}
        </button>
      </div>
    </>
  );
};
