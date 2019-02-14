import Main from "./components/Main";
import {register, Handler, Listener} from "framework";
import {State} from "./type";
import {SagaIterator} from "redux-saga";
import {NotesType} from "type/api";

const initialState: State = {
    name: "string",
    notesType: NotesType.FRONTEND,
};

class ActionHandler extends Handler<State> implements Listener {
    *onInitialized(): SagaIterator {
        yield* this.setState({});
    }

    *changeNotesNav(notesType: NotesType): SagaIterator {
        yield* this.setState({notesType});
    }

    *test(): SagaIterator {
        yield* this.setState({name: "voco"});
    }
}
const actions = register(new ActionHandler("notes", initialState));
export {actions, Main};
