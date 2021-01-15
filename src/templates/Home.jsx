import React, {useState, useCallback} from 'react';
import {PrimaryButton, TextInput} from "../components/UIkit";
import {useDispatch, useSelector} from "react-redux";
import {signIn, signOut} from "../reducks/users/operations";
import {push} from "connected-react-router"
import {getUsername, getUserId} from "../reducks/users/selectors";


const Home = () => {

    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const username = getUsername(selector);
    const uid = getUserId(selector);

    return(
        <>
        <p>ユーザー:{username}</p>
        <p>id:{uid}</p>
        <button onClick={() => dispatch(signOut())}>sign out</button>
        </>
    )
}

export default Home;