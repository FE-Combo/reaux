import {NotesType} from "type/api";

export function getNotesTypeName(type: NotesType): string {
    switch (type) {
        case NotesType.FRONTEND:
            return "前端";
        case NotesType.BACKEND:
            return "后端";
        case NotesType.DESIGN:
            return "设计";
        case NotesType.ENGLISH:
            return "英语";
        case NotesType.IMPRESSION:
            return "观感";
    }
}
