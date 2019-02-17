// TODO: 根据后端接口自动生成

export enum NotesType {
    FRONTEND = "FRONTEND",
    BACKEND = "BACKEND",
    DESIGN = "DESIGN",
    ENGLISH = "ENGLISH",
    IMPRESSION = "IMPRESSION",
}

export interface SearchNotesAJAXResponse {
    notes: SearchNotesAJAXResponse$Notes[];
    totalRecord: number;
    totalPage: number;
}

export interface SearchNotesAJAXResponse$Notes {
    imageURL: string;
    title: string;
    content: string;
}
