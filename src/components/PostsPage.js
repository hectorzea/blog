import React, {useContext, useEffect} from 'react';
import {StateContext} from "../contexts/appContext";
import {useResource} from "react-request-hook";
import PostList from "./PostList";

const PostsPage = () => {
    const {state, dispatch} = useContext(StateContext);

    const {error} = state;

    const [posts, getPosts] = useResource(() => ({
        url: "/posts",
        method: "get"
    }));

    useEffect(getPosts, []);

    useEffect(() => {
        if (posts && posts.error) {
            dispatch({type: 'POSTS_ERROR'})
        }
        if (posts && posts.data) {
            console.log(posts.data);
            dispatch({type: "FETCH_POSTS", posts: posts.data})
        }
    }, [posts]);


    return (
        <div>
            {error && <b>{error}</b>}
            <PostList/>
        </div>
    );
};

export default PostsPage;
