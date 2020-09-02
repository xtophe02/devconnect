import React from "react";
import { NavBar } from "./NavBar";

export const Layout = ({ children, title = "to set", subtitle = "to set" }) => {
  return (
    <>
      <NavBar />
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">{title}</h1>
            <h2 className="subtitle">{subtitle}</h2>
          </div>
        </div>
      </section>
      <div className="container">{children}</div>
    </>
  );
};
