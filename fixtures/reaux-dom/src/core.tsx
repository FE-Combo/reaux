import React, {ComponentType} from "react";
import ReactDOM from "react-dom";
import {createStore, compose, applyMiddleware, StoreEnhancer} from "redux";
import {Provider} from "react-redux";

const initialState = {
    app: {},
};

interface ActionType {
    type: string;
    name: string;
    payload: object;
}

function reducer(state = initialState, action: ActionType) {
    switch (action.type) {
        case "setState":
            const nextState = {...state};
            nextState["app"][action.name] = action.payload;
            return nextState;
        default:
            return state;
    }
}

function createApp() {
    const store = createStore(reducer, devtools(applyMiddleware()));
    store.subscribe(() => console.info("redux store update!!"));
    store.dispatch({
        type: "setState",
        name: "test",
        payload: {name: "manual trigger"},
    });

    return {store};
}
const {store} = createApp();

function devtools(enhancer: StoreEnhancer): StoreEnhancer {
    const extension = (window as any).__REDUX_DEVTOOLS_EXTENSION__;
    if (extension) {
        return compose(
            enhancer,
            extension({})
        );
    }
    return enhancer;
}

export function render(Component: ComponentType) {
    const rootElement = document.createElement("div");
    rootElement.id = "root";
    document.body.appendChild(rootElement);
    ReactDOM.render(
        <Provider store={store}>
            <Component />
        </Provider>,
        rootElement
    );
}

export function register(name: string, payload: object) {
    store.dispatch({
        type: "setState",
        name,
        payload,
    });
}
