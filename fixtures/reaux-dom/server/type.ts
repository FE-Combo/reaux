import {StateView} from "reaux-dom";
export interface HTMLOptions {
    content: string;
    serverRenderedModules?: string[];
    reduxState?: StateView;
}
