import React, {useState, useContext, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import {StateContext} from "../contexts/appContext";
import {useResource} from "react-request-hook";
import {useInput} from 'react-hookedup'
import {useNavigation} from "react-navi";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            <Link color="inherit" href="">
                Created by Hector Zea
            </Link>{' '}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const LoginPage = () => {
    const navigation = useNavigation();
    const {state, dispatch} = useContext(StateContext);
    const [loginFailed, setLoginFailed] = useState(false);


    const [user, login] = useResource((username, password) => ({
        url: `/login/${encodeURI(username)}/${encodeURI(password)}`,
        method: "get"
    }));


    useEffect(() => {
        if (user && user.data) {
            if (user.data.length > 0) {
                setLoginFailed(false);
                dispatch({type: "LOGIN", username: user.data[0].username});
                console.log(state);
                navigation.navigate("/main")
            } else {
                setLoginFailed(true);
            }
        }
        if (user && user.error) {
            setLoginFailed(true)
        }
    }, [user]);


    const classes = useStyles();
    const {value: username, bindToInput: bindUsername} = useInput('');
    const {value: password, bindToInput: bindPassword} = useInput('');

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Post Application From Hector Zea.
                </Typography>
                <form className={classes.form} noValidate onSubmit={e => {
                    e.preventDefault();
                    login(username, password);
                }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Mail"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={username}
                        {...bindUsername}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        value={password}
                        {...bindPassword}
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={username.length === 0}
                    >
                        Sign In
                    </Button>
                    {loginFailed && <span style={{color: 'red'}}>Invalid username or password</span>}
                    <Grid container>
                        <Grid item xs={12}>
                            <Link href="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright/>
            </Box>
        </Container>
    );
};

export default LoginPage;