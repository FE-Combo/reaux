import {State as MainState} from "../module/main/type";
import {State as HomeState} from "../module/home/type";
import {State as AboutState} from "../module/about/type";
import {StateView} from "reaux-dom";

export interface AllState extends StateView {
    main: MainState;
    home: HomeState;
    about: AboutState;
}
