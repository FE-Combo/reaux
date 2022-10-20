
import { State as MainState } from '../module/main/type';
import { State as HomeState } from '../module/home/type';
import { State as AboutState } from '../module/about/type';

export interface AllState {
    main: MainState,
    home: HomeState,
    about: AboutState
}
