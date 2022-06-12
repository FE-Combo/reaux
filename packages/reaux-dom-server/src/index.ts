import Koa from "koa";
import koaRouter from "koa-router";
import koaStatic from "koa-static";

export interface HTMLOptions<StateView> {
    content: string;
    serverRenderedModules?: string[];
    reduxState?: StateView;
}

interface Config {
    port: number;
    contentBase: string;
    isSSR: boolean;
    htmlTemplate: string;
    routes: Route[];
    startApp: Promise<any>;
}

interface Route {
    namespace: string;
    path?: string;
    module: () => Promise<any>;
}

export default (config: Config) => {
    const {isSSR, port, contentBase, htmlTemplate, routes, startApp} = config;
    const router = new koaRouter();
    const app = new Koa();

    app.use(koaStatic(contentBase));

    function generateHtml<S>(options: HTMLOptions<S>) {
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
            window.__REAUX_DATA__ = {isSSR:${isSSR} ,"ReduxState":${JSON.stringify(reduxState)},"serverRenderedModules":${JSON.stringify(serverRenderedModules)}}
        </script>
        <script src="client/index.js"></script>
        <script src="client/runtime.js"></script>
        <script src="client/vendors~index.js"></script>
        </body>
    </html>
    `;
    }

    // '*' => '(.*)'
    router.get("(.*)", async ctx => {
        const index = routes.findIndex(_ => _.path === ctx.req.url);
        if (index >= 0) {
            const options = await (await startApp)!(ctx.req.url);
            ctx.body = generateHtml({content: options?.content, reduxState: options?.reduxState, serverRenderedModules: options?.serverRenderedModules});
        }
    });

    app.use(router.routes()).use(router.allowedMethods());

    app.listen(port, () => {
        console.info(`> App started, port: ${port}`);
    });
};
