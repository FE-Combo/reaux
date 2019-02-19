import {SearchNoteAJAXResponse} from "type/api";

export interface State {
    name: string;
    data: SearchNoteAJAXResponse | null;
}
