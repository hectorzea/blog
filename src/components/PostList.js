import React, {useContext, useEffect} from 'react';
import Post from './Post';
import {StateContext} from "../contexts/appContext";

const PostList = () => {
    const {state} = useContext(StateContext);
    const {posts, user} = state;
    if (user) {
        return (
            <div>
                {posts.map((element, index) => <Post {...element} short={true} key={`post-${index}`}></Post>)}
            </div>
        );
    } else {
        return (
            <div>

            </div>
        );
    }
};

export default PostList;
