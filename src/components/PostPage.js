import React, {useEffect} from 'react'
import {useResource} from 'react-request-hook'
import Post from '../components/Post'
import {Link} from 'react-navi';

const PostPage = ({id}) => {

    const [post, getPost] = useResource(() => ({
        url: `/posts/${id}`,
        method: 'get'
    }));

    useEffect(getPost, [id]);

    return (
        <div>
            <div>
                <Link href="/main"> Go back!</Link>
            </div>
            {(post && post.data)
                ? <Post {...post.data} />
                : 'Loading...'
            }
            <hr/>
        </div>
    )
};

export default PostPage;
