import {State as MainState} from "module/main/type";
import {State as HomeState} from "module/home/type";
import {State as NotesState} from "module/notes/type";
import {State as NoteState} from "module/note/type";

export interface RootState {
    app: {
        main: MainState;
        home: HomeState;
        notes: NotesState;
        note: NoteState;
    };
}
