import React from "react";
import { useRouter } from "next/router";

export const ButtonsSubmit = ({ handleSubmit, loading }) => {
  const router = useRouter();
  return (
    <div className="field is-grouped is-grouped-right">
      <p className="control">
        <a
          className={`button is-primary ${loading && "is-loading"}`}
          onClick={handleSubmit}
        >
          Submit
        </a>
      </p>
      <p className="control">
        <a className="button is-light" onClick={() => router.back()}>
          Cancel
        </a>
      </p>
    </div>
  );
};
