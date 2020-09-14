import React from "react";
import Link from "next/link";

export const ProfileActions = () => {
  return (
    <article className="tile is-child notification ">
      <p className="title">Actions</p>
      <p className="subtitle">Aligned with the right tile</p>
      <div className="content">
        <div className="field is-grouped">
          <p className="control">
            <Link href="/edit-profile">
              <button className="button is-primary">Edit Profile</button>
            </Link>
          </p>
          <p className="control">
            <button className="button">Cancel</button>
          </p>
          <p className="control">
            <button className="button is-danger">Delete post</button>
          </p>
        </div>
      </div>
    </article>
  );
};
