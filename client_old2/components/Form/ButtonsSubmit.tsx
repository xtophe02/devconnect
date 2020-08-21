import React from "react";
import { useRouter } from "next/router";

export const ButtonsSubmit = ({ loading, text = ["Submit", "Cancel"] }) => {
  const router = useRouter();
  return (
    <div className="field is-grouped is-grouped-right">
      <p className="control">
        <button
          className={`button is-primary ${loading && "is-loading"}`}
          type="submit"
        >
          {text[0]}
        </button>
      </p>
      <p className="control">
        <a className="button is-light" onClick={() => router.back()}>
          {text[1]}
        </a>
      </p>
    </div>
  );
};
