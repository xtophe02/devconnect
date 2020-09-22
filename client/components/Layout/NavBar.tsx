import React from "react";
import Link from "next/link";
import { useQuery, useMutation, useApolloClient } from "@apollo/client";

import { IS_LOGGED_IN, LOGOUTUSER } from "../../src/queries";
import { logout } from "../../src/utils/logout";
import { useRouter } from "next/router";

export const NavBar = () => {
  const client = useApolloClient();
  const router = useRouter();
  const { data } = useQuery(IS_LOGGED_IN);
  const [logOutUser] = useMutation(LOGOUTUSER);
  const NavLink = ({ href, className, text, flag = false }) => {
    if (flag) return null;

    return (
      <Link href={href}>
        <a className={className}>
          {className === "navbar-item" ? text : <strong>{text}</strong>}
        </a>
      </Link>
    );
  };

  return (
    <nav
      className="navbar is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            width="112"
            height="28"
          />
        </a>

        <a
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <NavLink href="/" className="navbar-item" text="Home" />
          <NavLink
            href="/profile"
            className="navbar-item"
            text="Profile"
            flag={data && !data.isLoggedIn}
          />

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">More</a>

            <div className="navbar-dropdown">
              <a className="navbar-item">About</a>
              <a className="navbar-item">Jobs</a>
              <a className="navbar-item">Contact</a>
              <hr className="navbar-divider" />
              <a className="navbar-item">Report an issue</a>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <NavLink
                href="/login"
                className="button is-primary"
                text="Log In"
                flag={data && data.isLoggedIn}
              />
              {data && data.isLoggedIn && (
                <a
                  className="button is-danger is-light"
                  onClick={async () => {
                    await logout(client, logOutUser);
                    router.push("/");
                  }}
                >
                  <strong>Log Out</strong>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
