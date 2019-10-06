import {AppView} from "../type";

export default function createApp<T extends AppView>(callback?: (app: AppView) => T): T {
    const app = {
        actionHandler: {},
        modules: {},
        // TODO: Why use object ?????????
        exceptionHandler: {},
    } as T;
    return callback ? callback(app) : app;
}
