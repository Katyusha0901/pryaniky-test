import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ChangeRowsAndAuthorizationContext } from "../ChangeRowsAndAuthorizationContextProvider";
import { useContext, useState } from "react";
import { HOST } from "../HostExport";
import Alert from "@mui/material/Alert";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export function SignInSide() {
  const { checkisLoggedIn, takeData } = useContext(
    ChangeRowsAndAuthorizationContext
  );

  const [isCorrectUserData, setIsCorrectUserData] = useState<boolean>(true);
  const [isErrorInSignInData, setIsErrorInSignInData] =
    useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      username: data.get("username"),
      password: data.get("password"),
    };
    const requestOptions: {
      method: string;
      headers: HeadersInit;
      body: BodyInit;
    } = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };

    fetch(`${HOST}/ru/data/v3/testmethods/docs/login`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error_code === 0) {
          if (data.data !== null) {
            localStorage.setItem("x-auth", data.data.token);
            checkisLoggedIn();
            takeData();
          } else {
            localStorage.removeItem("x-auth");
            checkisLoggedIn();
            setIsCorrectUserData(false);
          }
        } else {
          setIsErrorInSignInData(true);
        }
      });
  };

  return isErrorInSignInData ? (
    <Alert severity="error">This is an error.</Alert>
  ) : (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label={
                  isCorrectUserData ? "User Name" : "Enter user{N}, N=1,2,...33"
                }
                name="username"
                autoComplete="username"
                autoFocus
                style={
                  isCorrectUserData
                    ? { boxShadow: "0px  black" }
                    : { boxShadow: "1px 1px 0px 1px red" }
                }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label={isCorrectUserData ? "Password" : "Enter 'password'"}
                type="password"
                id="password"
                autoComplete="current-password"
                style={
                  isCorrectUserData
                    ? { boxShadow: "0px  black" }
                    : { boxShadow: "1px 1px 0px 1px red" }
                }
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>

              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
