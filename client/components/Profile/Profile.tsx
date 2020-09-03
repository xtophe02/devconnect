import React from "react";
import Link from "next/link";
import { UserInfo } from "./UserInfo";
import { ProfileInfo } from "./ProfileInfo";

export const Profile = ({ currentUser }) => {
  const { data } = currentUser;

  const { profile } = data;

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
              <UserInfo data={data} />
            </article>
            <article className="tile is-child notification ">
              {!profile ? (
                <>
                  <div className="mb-2">
                    ...no profile, please to create your profile
                  </div>
                  <div className="buttons has-addons is-right">
                    <Link href="/create-profile">
                      <button className="button is-small">
                        Create Profile
                      </button>
                    </Link>
                  </div>
                </>
              ) : (
                <ProfileInfo profile={profile} />
              )}
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
