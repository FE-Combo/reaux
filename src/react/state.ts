import {RouterState} from "connected-react-router";

export interface State {
    router: RouterState | null;
    app: {};
}

export const initialState: State = {
    router: null,
    app: {},
};
