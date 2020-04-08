import React, {useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {StateContext} from "../contexts/appContext";
import CreatePost from "./CreatePost";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));


const HeaderComponent = () => {
    const {state, dispatch} = useContext(StateContext);
    const {user} = state;
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        dispatch({type: 'LOGOUT'})
    };

    const classes = useStyles();
    return (
        <React.Fragment>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        {user}
                    </Typography>
                    <Typography variant="h6" className={classes.title}>
                    </Typography>
                    <Button color="inherit" onClick={handleClickOpen}>
                        Crear Post
                    </Button>
                    <Button onClick={handleLogout} color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>
            <CreatePost setOpen={setOpen} open={open}
                        handleClose={handleClose}/>
        </React.Fragment>
    )
};

export default HeaderComponent;
