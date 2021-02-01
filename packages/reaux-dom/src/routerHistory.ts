import {createBrowserHistory, createMemoryHistory, History} from "history";

export const isServer = !(typeof window !== "undefined" && window.document && window.document.createElement);

const createHistory = (url: string = "/"): History<any> => {
    return isServer
        ? createMemoryHistory({
              initialEntries: [url],
          })
        : createBrowserHistory();
};

export default createHistory;
