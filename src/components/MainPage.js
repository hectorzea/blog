import React, {useContext, useEffect} from 'react';
import HeaderComponent from "./HeaderComponent";
import {StateContext} from "../contexts/appContext";
import {useNavigation} from "react-navi";
import PostsPage from "./PostsPage";

const MainPage = () => {
    const {state} = useContext(StateContext);
    const navigator = useNavigation();
    const {user} = state;

    const checkUserLogged = () => {
        if (!user) {
            navigator.navigate("/");
        }
    };

    useEffect(checkUserLogged, [user]);

    return (
        <div>
            <HeaderComponent/>
            <PostsPage/>
        </div>
    );
};

export default MainPage;
