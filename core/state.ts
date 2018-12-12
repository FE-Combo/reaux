import {RouterState} from "connected-react-router";
import {LoadingState} from "./type";

export interface State {
    router: RouterState | null;
    loading: LoadingState;
    app: {};
}

export const initialState: State = {
    router: null,
    app: {},
    loading: {},
};
