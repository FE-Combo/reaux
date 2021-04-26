export default [
    {
        namespace: "main",
        module: () => import(/* webpackChunkName: "entry-module" */ "./module/main"),
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
