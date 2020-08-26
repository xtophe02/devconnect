import React from "react";
import Email from "@material-ui/icons/Email";
import Category from "@material-ui/icons/Category";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@material-ui/core";

export const ProfileItem = ({ text, secondary }) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          {text === "Email" && <Email />}
          {text === "Role" && <Category />}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={text} secondary={secondary} />
    </ListItem>
  );
};
