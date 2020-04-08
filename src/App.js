import React, {useReducer} from 'react';
import './App.css';
import LoginPage from "./components/LoginPage";
import {Router, View} from 'react-navi'
import {mount, route} from 'navi'
import RegisterPage from "./components/RegisterPage";
import {StateContext} from "./contexts/appContext";
import {appReducer} from "./reducers/appReducer";
import MainPage from "./components/MainPage";
import PostPage from "./components/PostPage";


function App() {
    const [state, dispatch] = useReducer(appReducer, {user: "", posts: [], error: ''});
    const routes = mount({
        '/': route({view: <LoginPage/>}),
        '/register': route({view: <RegisterPage/>}),
        '/main': route({view: <MainPage/>}),
        '/view/:id': route(req => {
            return {view: <PostPage id={req.params.id}/>}
        }),
    });

    const {user} = state;
    console.log(user);


    return (
        <StateContext.Provider value={{state, dispatch}}>
            <Router routes={routes}>
                <div>
                    <View/>
                </div>
            </Router>
        </StateContext.Provider>
    );
}

export default App;
