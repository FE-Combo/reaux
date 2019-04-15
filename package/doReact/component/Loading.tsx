import app from "../boot/app";

export function isLoading(identifier: string = "global"): boolean {
    return app.store.getState().loading[identifier] > 0;
}
