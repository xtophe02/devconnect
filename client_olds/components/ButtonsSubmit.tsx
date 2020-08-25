import React from "react";
import { useRouter } from "next/router";

export const ButtonsSubmit = () => {
  const router = useRouter();
  return (
    <div className="field is-grouped is-grouped-right">
      <p className="control">
        <button className="button is-primary" type="submit">
          Submit
        </button>
      </p>
      <p className="control">
        <a className="button is-light" onClick={() => router.back()}>
          Cancel
        </a>
      </p>
    </div>
  );
};
