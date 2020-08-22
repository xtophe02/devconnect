import React from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { useApolloClient } from "@apollo/client";
import { LOGOUTUSER } from "../../src/queries";
import { isLoggedInVar } from "../../apollo/cache";
import { useRouter } from "next/router";

export const LoginMenu = () => {
  const client = useApolloClient();
  const router = useRouter();
  const [logOutUser] = useMutation(LOGOUTUSER);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={openMenu}
        onClose={handleClose}
      >
        <MenuItem onClick={() => router.push("/profile")}>My Profile</MenuItem>
        <MenuItem
          onClick={() => {
            // Since we're logging out, remove all traces of the current user
            // from the cache. First use `cache.evict()` to remove the stored
            // `me` reference that was added to the cache by the `GET_MY_TRIPS`
            // query in `profile.tsx`. Then trigger garbage collection using
            // `cache.gc()` to remove the cached `User` object that is no longer
            // reachable.
            // client.cache.evict({ fieldName: 'me' });
            client.cache.gc();

            // Remove user details from localStorage.
            localStorage.clear();

            // Let other parts of the application that are relying on logged in
            // state know we're now logged out.
            isLoggedInVar(false);
            // userLoggedInVar("");
            logOutUser();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};
