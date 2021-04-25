export default [
    {
        namespace: "main",
        path: "/",
        module: () => import(/* webpackChunkName: "entry-module" */ "./module/main"),
        entry: true,
    },
    {
        namespace: "about",
        path: "/about",
        module: () => import(/* webpackChunkName: "about" */ "./module/about"),
    },
    {
        namespace: "home",
        path: "/home",
        module: () => import(/* webpackChunkName: "home" */ "./module/home"),
    },
];
