import Koa from "koa";
import koaRouter from "koa-router";
import koaStatic from "koa-static";
import Loadable from "react-loadable";
import * as reauxDom from "reaux-dom";
import routes from "./route";
import start from "./index";
const {ENV = "development"} = process.env;
export interface HTMLOptions {
    content: string;
    serverRenderedModules?: string[];
    reduxState?: reauxDom.StateView;
}

const router = new koaRouter();
const app = new Koa();
const port = 8080;

app.use(koaStatic("./dist"));

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
    <script src="client/index.js"></script>
    <script src="client/runtime.js"></script>
    <script src="client/vendors~index.js"></script>
    </body>
</html>
`;
};

// '*' => '(.*)'
router.get("(.*)", async function(ctx) {
    const index = routes.findIndex(_ => _.path === ctx.req.url);
    if (index >= 0) {
        const options = await (await start)!(ctx.req.url);
        ctx.body = generateHtml({content: options?.content, serverRenderedModules: options?.serverRenderedModules || [], reduxState: options?.reduxState || ({} as any)});
    }
});

app.use(router.routes()).use(router.allowedMethods());

Loadable.preloadAll().then(() => {
    app.listen(port, () => {
        console.info(`> server start, port: ${port}`);
    });
});
