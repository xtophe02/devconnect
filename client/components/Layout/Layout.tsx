import React from "react";
import { useMutation } from "@apollo/client";
import { useApolloClient } from "@apollo/client";
import clsx from "clsx";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import {
  Drawer,
  Button,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Snackbar,
} from "@material-ui/core";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToApp from "@material-ui/icons/ExitToApp";
import AssignmentInd from "@material-ui/icons/AssignmentInd";
import Home from "@material-ui/icons/Home";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { useQuery } from "@apollo/client";
import { IS_LOGGED_IN, LOGOUTUSER } from "../../src/queries";
import { Login } from "../Login/Login";
import { logout } from "../../src/utils/logout";
import { useRouter } from "next/router";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    title: {
      flexGrow: 1,
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  })
);
function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export const Layout = ({ children, title = "to set" }) => {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const { data } = useQuery(IS_LOGGED_IN);
  const [logOutUser] = useMutation(LOGOUTUSER, {
    onCompleted: ({ logOutUser }) => {
      if (logOutUser.success) {
        setOpenSnack(!openSnack);
      }
    },
  });
  const client = useApolloClient();
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(!openSnack);
  };
  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openDrawer,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpenDrawer(!openDrawer)}
            edge="start"
            className={clsx(classes.menuButton, openDrawer && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            {title}
          </Typography>
          {data && !data.isLoggedIn ? (
            <Button color="inherit" onClick={() => setOpenDialog(!openDialog)}>
              Login
            </Button>
          ) : (
            <Avatar>H</Avatar>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={openDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            button
            onClick={() => {
              setOpenDrawer(!openDrawer);
              router.push("/");
            }}
          >
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              setOpenDrawer(!openDrawer);
              router.push("/profile");
            }}
          >
            <ListItemIcon>
              <AssignmentInd />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </ListItem>
          <Divider />
          <ListItem
            button
            onClick={() => {
              setOpenDrawer(!openDrawer);

              logout(logOutUser, client);
              router.push("/");
            }}
          >
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
      <Login openDialog={openDialog} setOpenDialog={setOpenDialog} />
      <Snackbar
        open={openSnack}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert onClose={handleClose} severity="success">
          You have been Logged Out
        </Alert>
      </Snackbar>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: openDrawer,
        })}
      >
        <div className={classes.drawerHeader} />

        {children}
      </main>
    </div>
  );
};
