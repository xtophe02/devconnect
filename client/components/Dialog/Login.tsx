import React from "react";
import { useMutation } from "@apollo/client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  CircularProgress,
} from "@material-ui/core";

import { TransitionProps } from "@material-ui/core/transitions";

import { LoginForm } from "../Form/LoginForm";
import { isLoggedInVar } from "../../apollo/cache";
import { LOGIN } from "../../src/queries";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

interface State {
  password: string;
  email: string;
  showPassword: boolean;
}

export const Login = ({ open, setOpen }) => {
  const [signIn, { error, loading }] = useMutation(LOGIN, {
    onCompleted: ({ logInUser }) => {
      localStorage.setItem("userEmail", logInUser.data.email as string);
      // userLoggedInVar(logInUser.data.email);
      isLoggedInVar(logInUser.success);
      setOpen(!open);
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signIn({
        variables: {
          data: {
            email: values.email,
            password: values.password,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [values, setValues] = React.useState<State>({
    password: "",
    email: "",
    showPassword: false,
  });

  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      // onClose={() => setOpen(!open)}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        Enter your credentials
      </DialogTitle>
      <DialogContent>
        {/* <DialogContentText id="alert-dialog-slide-description"> */}
        <LoginForm
          values={values}
          handleChange={handleChange}
          handleClickShowPassword={handleClickShowPassword}
        />
        {/* </DialogContentText> */}
        {error && JSON.stringify(error)}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(!open)} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="secondary">
          {loading ? <CircularProgress size={20} /> : "Login"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
