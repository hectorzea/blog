import React, {useState, useContext, useEffect} from 'react';
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {StateContext} from "../contexts/appContext";
import {useResource} from "react-request-hook";
import {useInput} from "react-hookedup";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import {useNavigation} from "react-navi";

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


const RegisterPage = () => {
    const navigator = useNavigation();
    const {dispatch} = useContext(StateContext);
    const [user, register] = useResource((username, password) => ({
        url: "/users",
        method: "post",
        data: {username, password}
    }));

    const createUser = () => {
        if (user && user.data) {
            dispatch({type: 'REGISTER', username: {username: user.data.username}})
            navigator.navigate("/");
        }
    };

    useEffect(createUser, [user]);

    const classes = useStyles();

    const {value: username, bindToInput: bindUsername} = useInput('');
    const {value: password, bindToInput: bindPassword} = useInput('');
    const {value: passwordRepeat, bindToInput: bindPasswordRepeat} = useInput('');


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Registrar Usuario
                </Typography>
                <form className={classes.form} noValidate onSubmit={e => {
                    e.preventDefault();
                    register(username, password)
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
                        value={username}
                        autoFocus
                        {...bindUsername}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        {...bindPassword}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="repeatPassword"
                        label="Repetir Contraseña"
                        type="repeatPassword"
                        id="repeatPassword"
                        value={passwordRepeat}
                        {...bindPasswordRepeat}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={username.length === 0 || password.length === 0 || password !== passwordRepeat}
                    >
                        Registrar Usuario
                    </Button>
                    <Grid container>
                        <Grid item xs={12}>
                            <Link href="/" variant="body2">
                                {"Volver al login"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default RegisterPage;
