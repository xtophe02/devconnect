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
} from "@material-ui/core";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToApp from "@material-ui/icons/ExitToApp";
import AssignmentInd from "@material-ui/icons/AssignmentInd";
import Home from "@material-ui/icons/Home";

import { useQuery } from "@apollo/client";
import { IS_LOGGED_IN, LOGOUTUSER } from "../../src/queries";
import { SnackbarMsg } from "../Snackbar/Snackbar";
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
        router.push("/");
      }
    },
  });
  const client = useApolloClient();

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
          {data && data.isLoggedIn && (
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
          )}

          <Divider />
          {data && data.isLoggedIn && (
            <ListItem
              button
              onClick={async () => {
                setOpenDrawer(!openDrawer);
                await logout(logOutUser, client);
              }}
            >
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          )}
        </List>
      </Drawer>
      <Login openDialog={openDialog} setOpenDialog={setOpenDialog} />

      <SnackbarMsg
        openSnack={openSnack}
        setOpenSnack={setOpenSnack}
        msg="You have been Logged Out"
        severity="info"
      />
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
