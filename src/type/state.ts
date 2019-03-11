import {State as MainState} from "module/main/type";
import {State as IntroHomeState} from "module/intro/home/type";
import {State as NoteListState} from "module/note/list/type";
import {State as NoteDetailState} from "module/note/detail/type";

export interface RootState {
    app: {
        main: MainState;
        home: IntroHomeState;
        noteList: NoteListState;
        noteDetail: NoteDetailState;
    };
}
