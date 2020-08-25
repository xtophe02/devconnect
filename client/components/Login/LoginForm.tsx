import React from "react";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import { FormControl, TextField } from "@material-ui/core/";

import { PasswordInput } from "./PassordInput";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    // textField: {
    //   width: "25ch",
    // },
  })
);

export const LoginForm = ({
  handleClickShowPassword,
  values,
  handleChange,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FormControl
        // className={clsx(classes.margin, classes.textField)}
        className={classes.margin}
        variant="outlined"
        fullWidth
      >
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          value={values.email}
          onChange={handleChange("email")}
        />
      </FormControl>
      <FormControl
        // className={clsx(classes.margin, classes.textField)}
        className={classes.margin}
        variant="outlined"
        fullWidth
      >
        <PasswordInput
          handleClickShowPassword={handleClickShowPassword}
          value={values.password}
          showPassword={values.showPassword}
          handleChange={handleChange}
        />
      </FormControl>
    </div>
  );
};
