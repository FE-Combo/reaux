import * as Koa from "koa";
import * as koaRouter from "koa-router";
import * as koaStatic from "koa-static";
import * as Loadable from "react-loadable";
import {View as MainView} from "../src/module/main";
import * as path from "path";
import {HTMLOptions} from "./type";
const router = new koaRouter();
const app = new Koa();

app.use(koaStatic(path.join(__dirname, "../dist")));

const generateHtml = (options: HTMLOptions) => {
    const {content, reduxState = {}, serverRenderedModules = []} = options;
    return `
<!DOCTYPE html>
<html lang="en">
    <head>
    <meta charset="UTF-8" />
    <title>reaux-dom</title>
    </head>
    <body>
    <div id="reaux-app-root">${content}</div>
    <script>
        window.__REAUX_DATA__ = {"ReduxState":${JSON.stringify(reduxState)},"page":"/","query":{ },"env":"development","serverRenderedModules":${JSON.stringify(serverRenderedModules)}}
    </script>
    <script src="client/home.js"></script>
    <script src="client/index.js"></script>
    <script src="client/runtime.js"></script>
    <script src="client/vendors~index.js"></script>
    </body>
</html>
`;
};
// '*' => '(.*)'
router.get("(.*)", async ctx => {
    const {start} = await import("reaux-dom");
    const options = start({Component: MainView, url: ctx.request.url})!;
    ctx.body = generateHtml({content: options?.content, serverRenderedModules: options?.serverRenderedModules || [], reduxState: options?.reduxState || ({} as any)});
});

app.use(router.routes()).use(router.allowedMethods());

Loadable.preloadAll().then(() => {
    app.listen(8080, () => {
        console.info("server started");
    });
});
