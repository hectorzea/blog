import React, {useState, useContext, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {StateContext} from "../contexts/appContext";
import {useResource} from "react-request-hook";
import {useNavigation} from "react-navi";
import {useInput} from "react-hookedup";

const CreatePost = ({open, handleClose, setOpen}) => {


    const [post, createPost] = useResource(({title, content, author}) => ({
        url: '/posts',
        method: 'post',
        data: {title, content, author}
    }));

    const navigation = useNavigation();

    useEffect(() => {
        if (post && post.data) {
            dispatch({type: "CREATE_POST", ...post.data});
            navigation.navigate(`/view/${post.data.id}`)
        }
    }, [post]);

    const {state, dispatch} = useContext(StateContext);
    const {user} = state;

    const {value: title, bindToInput: bindTitle} = useInput('');
    const {value: content, bindToInput: bindContent} = useInput('');

    const handleCreatePost = () => {
        createPost({title, content, author: user});
        setOpen(false);
    };


    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Crear Post</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Autor: {user}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="postTitle"
                        label="Titulo del post"
                        value={title}
                        {...bindTitle}
                        type="text"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="postText"
                        label="Texto del post"
                        value={content}
                        {...bindContent}
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleCreatePost} color="primary">
                        Crear Post
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CreatePost;
