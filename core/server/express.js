require("babel-register");

const express = require("express");
const React = require("react");
const {renderToString} = require("react-dom/server");

function createServer(staticURL, port, Layout2, HTML) {
    const app = express();
    app.use(express.static(staticURL));
    app.use("/a", (request, response) => {
        const a = `<div>${Layout}</div>`;
        const reactDOMToString = renderToString(a);
        response.writeHead(200, {"Content-Type": "text/html"});
        console.info(reactDOMToString);
        response.end(createHTML(reactDOMToString));
    });

    app.listen(port, () => {
        console.info("启动服务！！");
    });
}

class Layout extends React.Component {
    render() {
        return "Welcome to React SSR!";
    }
}

function createHTML(reactDOMToString) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>React SSR</title>
        </head>
        
        <body>
            <div id="app">${reactDOMToString}</div>
        </body>
        </html>
    `;
}

module.exports = createServer;
