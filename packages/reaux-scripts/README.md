# `reaux-scripts`

> Script and configuration of reaux

## Usage

> reaux.config.js

- baseConfig: (config)=>config
    - port: 端口号
    - baseUrl: 代码块目录
    - entry: 入口
    - serverEntry: 服务端入口
    - outputPath: 打包路径
    - outputFilename: 打包文件名
    - outputPublicPath: 打包路径前缀
    - serverOutputPath: 服务端打包路径
    - serverOutputFilename: 服务端打包文件名
    - serverOutputPublicPath: 服务端打包路径前缀
    - htmlTemplate: html模板
    - contentBase: 静态资源路径
    - globalConstant: webpack DefinePlugin 全局常量
    - clientTSConfig: 客户端tsconfig文件路径,
    - serverTSConfig: 服务端tsconfig文件路径,

- devServerConfig: (config)=>config
    - 开发环境服务, 配置同webpack-dev-server

- prodServerConfig: (config)=>config
    - 生产环境服务, 配置同koa

- webpackDevConfig: (config)=>config
    - 开发环境webpack配置, 配置同 webpack config

- webpackProdConfig: (config)=>config
    - 生产环境webpack配置, 配置同 webpack config

> scripts

- dev:client

- dev:server

- start

- build

- build:client

- build:server

> plugins

- with css

- with less

- with scss

- with rem2px

- with dotI18n

## TODO

> custom server