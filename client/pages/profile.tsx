import React from "react";
import { Paper, Grid } from "@material-ui/core";
import { Layout, Loading } from "../components";
import { useQuery } from "@apollo/client";
import { CURRENTUSER } from "../src/queries";
import { useRouter } from "next/router";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Profile } from "../components/";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      // color: theme.palette.text.secondary,
    },
  })
);

const profile = () => {
  const classes = useStyles();
  const { data, loading, error } = useQuery(CURRENTUSER);

  const router = useRouter();
  if (data && !loading && data.currentUser && !data.currentUser.success) {
    router.push("/");
  }

  return (
    <Layout
      title={data && data.currentUser.data && data.currentUser.data.email}
    >
      {loading && <Loading />}
      {data && data.currentUser.success && (
        <div className={classes.root}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Paper className={classes.paper}>xs=6</Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper className={classes.paper}>
                <Profile data={data.currentUser.data} />
              </Paper>
            </Grid>
          </Grid>
        </div>
      )}

      {error && JSON.stringify(error)}
    </Layout>
  );
};

export default profile;
