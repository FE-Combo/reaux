import {NotesType, SearchNotesAJAXResponse} from "type/api";

export interface State {
    name: string;
    notesType: NotesType;
    data: SearchNotesAJAXResponse | null;
}
