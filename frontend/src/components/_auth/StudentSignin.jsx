import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import loginService from '../../services/login';
import ErrorMessage from '../ErrorMessage';
import CustomThemeProvider from '../CustomThemeProvider';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Academic Performance Tracker
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function StudentSignin() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // extracting data
    const email = data.get('email');
    const password = data.get('password');
    if (!email || !password) {
      setErrorMessage("Missing email or password");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    }
    const credentials = {
      email: email,
      password,
    };
    loginService
      .loginStudent(credentials)
      .then((student) => {
        window.localStorage.setItem(
          "loggedAcademicTrackingstudent",
          JSON.stringify(student)
        );
        setErrorMessage("");
        navigate("/student/dashboard", { replace: true });
      })
      .catch((error) => {
        if (error.response.data.error) {
          setErrorMessage(error.response.data.error);
          setTimeout(() => {
            setErrorMessage("");
          }, 5000);
        } else {
          setErrorMessage(
            "Error logging in : Please check the console for more details"
          );
          console.error(error);
          setTimeout(() => {
            setErrorMessage("");
          }, 5000);
        }
      });
  };

  return (
    <CustomThemeProvider>
      <ErrorMessage errorMessage={errorMessage} />
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Button
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => navigate('/signin')}
              >
                Sign In as User
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/student/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </CustomThemeProvider>
  );
}