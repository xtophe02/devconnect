import React from "react";
import Link from "next/link";
import { Menu, Segment, Header } from "semantic-ui-react";

export const Navbar = () => {
  const [activeItem, setActiveItem] = React.useState("home");

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const NavLink = ({ name }) => (
    <Link href={`${name === "home" ? "/" : "/" + name}`}>
      <Menu.Item
        name={name}
        active={activeItem === { name }}
        onClick={() => setActiveItem(name)}
      />
    </Link>
  );

  return (
    <Segment inverted>
      <Menu inverted pointing secondary>
        <NavLink name="home" />
        <NavLink name="about" />
        <Menu.Item
          name="friends"
          active={activeItem === "friends"}
          onClick={handleItemClick}
        />
        <Menu.Menu position="right">
          <Menu.Item
            name="logout"
            active={activeItem === "logout"}
            onClick={handleItemClick}
          />
        </Menu.Menu>
      </Menu>
    </Segment>
  );
};
