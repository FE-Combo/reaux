import {State as MainState} from "module/main/type";
import {State as NotesState} from "module/notes/type";
import {State as NoteState} from "module/note/type";

export interface RootState {
    app: {
        main: MainState;
        notes: NotesState;
        note: NoteState;
    };
}
