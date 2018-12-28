import React from "react";
import App from "./App";
import {createStore} from "redux";

const reducer = () => {
    return (state: any) => {
        return state;
    };
};

const createApp = () => <App />;
const createStores = (store: any) => {
    return createStore(reducer, store);
};
const router: any[] = [];

export {createApp};
