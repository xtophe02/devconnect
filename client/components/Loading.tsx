import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "& > * + *": {
        marginLeft: theme.spacing(2),
      },
    },
  })
);

export const Loading = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress size={100} />
    </div>
  );
};
