import React from "react";
import Link from "next/link";
import { LogoutButton } from "../Form/LogoutButton";
import { USER_LOGGED_IN } from "../../queries";
import { useQuery } from "@apollo/client";

const NavBar = () => {
  const { data } = useQuery(USER_LOGGED_IN);

  const NavLink = ({ href, className, linkName }) => (
    <Link href={href}>
      <a className={className}>{linkName}</a>
    </Link>
  );
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
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
          <NavLink href="/" className="navbar-item" linkName="Home" />
          {data && data.userLoggedIn && (
            <NavLink
              href="/profile"
              className="navbar-item"
              linkName="Profile"
            />
          )}
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {data && data.userLoggedIn && (
                <a className="button is-light">
                  <strong>Create User</strong>
                </a>
              )}

              {data && data.userLoggedIn && <LogoutButton />}
              {data && !data.userLoggedIn && (
                <NavLink
                  href="/login"
                  className="button is-primary"
                  linkName="Log in"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
