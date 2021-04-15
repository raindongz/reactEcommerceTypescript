import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import SignUp from "../Service/SignUpService";
import SignUpService from "../Service/SignUpService";
import SignUpSuccessfulDialog from "../Styles/MaterialUI/SignUpPageDialogs/SignUpSuccessfulDialog";
import SignUpFailedDialog from "../Styles/MaterialUI/SignUpPageDialogs/SignUpFailedDialog";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignupPage() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSignupSuccess, setOpenSignupSuccess] = useState(false);
  const [signUpSuccessfulMsg, setSignupSuccessfulMsg] = useState("");
  const [openSignUpFailed, setOpenSignUpFailed] = useState(false);
  const [signUpFailedMsg, setSignUpFailedMsg] = useState("");
  const history = useHistory();

  function handleSuccessDialogClose() {
    setOpenSignupSuccess(false);
    let path = "/customerLogin";
    history.push(path);
  }
  function handleFailedDialogClose() {
    setOpenSignUpFailed(false);
  }

  function handleSignUp() {
    let role = new Set();
    role.add("CUSTOMER");
    const userInfo = {
      id: "",
      name: name,
      email: email,
      password: password,
      role: role,
    };
    SignUpService.SignUp(userInfo)
      .then((response) => {
        if (response.data === true) {
          setSignupSuccessfulMsg("Sign up successful!");
          setOpenSignupSuccess(true);
        }
      })
      .catch((error) => {
        setSignUpFailedMsg(error.response.data.message);
        console.log(error.response.data.message);
        setOpenSignUpFailed(true);
        //let path = "/customerLogin";
        //history.push(path);
      });
  }

  function redirectToSignIn() {
    let path = "/customerLogin";
    history.push(path);
  }
  return (
    <Container component="main" maxWidth="xs">
      {/*-- sign up successful dialog*/}
      <SignUpSuccessfulDialog
        open={openSignupSuccess}
        message={signUpSuccessfulMsg}
        handleClose={handleSuccessDialogClose}
      />
      {/*-- sign up failed dialog*/}
      <SignUpFailedDialog
        open={openSignUpFailed}
        message={signUpFailedMsg}
        handleClose={handleFailedDialogClose}
      />
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="Name"
                variant="outlined"
                required
                fullWidth
                id="Name"
                label="Name"
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2" onClick={redirectToSignIn}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
