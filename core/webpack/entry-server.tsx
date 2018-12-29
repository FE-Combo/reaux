import React from "react";
import {createStore} from "redux";

class App extends React.Component {
    render() {
        return (
            <div className="outer">
                <div className="inner">server</div>
            </div>
        );
    }
}

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

export default function render(path: any): Promise<any> {
    const promise = import(/* webpackChunkName: "test" */ "./App");
    return promise;
}
