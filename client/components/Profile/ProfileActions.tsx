import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export const ProfileActions = () => {
  const router = useRouter();
  return (
    <article className="tile is-child notification ">
      <p className="title">Actions</p>
      <p className="subtitle">Aligned with the right tile</p>
      <div className="content">
        <div className="field is-grouped ">
          <p className="control">
            <Link href="/password-change">
              <button className="button is-primary is-light">
                Change Password
              </button>
            </Link>
          </p>
          <p className="control">
            <button
              className="button is-link is-light"
              onClick={() => router.push("/create-user")}
            >
              Create User
            </button>
          </p>
          <p className="control">
            <button
              className="button is-danger is-light"
              onClick={() => alert("are you sure?")}
            >
              Delete Account
            </button>
          </p>
        </div>
      </div>
    </article>
  );
};
