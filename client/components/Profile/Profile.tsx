import React from "react";
import Link from "next/link";
import { UserInfo } from "./UserInfo";
import { ProfileInfo } from "./ProfileInfo";
import { Avatar } from "./Avatar";
import { ProfileActions } from "./ProfileActions";

export const Profile = ({ currentUser }) => {
  const { data } = currentUser;

  const { profile } = data;

  return (
    <div className="tile is-ancestor">
      <div className="tile is-vertical is-8">
        <div className="tile">
          <div className="tile is-parent">
            <Avatar image={profile.avatar} />
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
          <ProfileActions />
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
