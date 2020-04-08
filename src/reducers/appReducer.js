const userReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
        case "REGISTER":
            return action.username;
        case 'LOGOUT':
            return '';
        default:
            return state;
    }
};

const postReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_POSTS':
            return action.posts;
        case 'CREATE_POST':
            const newPost = {title: action.title, content: action.content, author: action.author, id: action.id};
            return [newPost, ...state];
        default:
            return state;
    }
};

const ErrorReducer = (state, action) => {
    switch (action.type) {
        case "POSTS_ERROR":
            return 'Failed to get posts';
        default:
            return state
    }
};

export const appReducer = (state, action) => {
    return {
        user: userReducer(state.user, action),
        posts: postReducer(state.posts, action),
        error: ErrorReducer(state.error, action)
    }
};