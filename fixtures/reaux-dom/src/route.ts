import {View as AboutView} from "./module/about";
import {View as HomeView} from "./module/home";
import {View as MainView} from "./module/main";

export default [
    {
        path: "/about",
        component: AboutView,
    },
    {
        path: "/home",
        component: HomeView,
    },
    {
        path: "/",
        component: MainView,
    },
];
