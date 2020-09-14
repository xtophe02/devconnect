import React from "react";

export const Avatar = ({ image }) => {
  return (
    <article className="tile is-child notification">
      <p className="title">Avatar</p>
      {/* <p className="subtitle">With an image</p> */}
      <figure className="image is-4by3">
        <img src={image} />
      </figure>
    </article>
  );
};
