import React from "react";
import {connect, DispatchProp} from "react-redux";
import {actions} from "module/notes";
import {NotesType, SearchNotesAJAXResponse} from "type/api";
import {getNotesTypeName} from "utils/lang";
import {objectToArray} from "framework/utils";
import {RootState} from "type/state";
import Card from "./Card";
import "./index.less";

interface StateProps {
    notesType: NotesType;
    data: SearchNotesAJAXResponse | null;
}

interface Props extends StateProps, DispatchProp {}

class Notes extends React.PureComponent<Props> {
    onNotesNavClick = (type: NotesType) => this.props.dispatch(actions.changeNotesNav(type));

    render() {
        const {data, notesType} = this.props;
        return (
            <div className="notes-container">
                <h1>知识改变命运</h1>
                <div className="tag g-flex-center">
                    {objectToArray(NotesType, (key, value) => (
                        <nav key={key} onClick={() => this.onNotesNavClick(value)}>
                            {getNotesTypeName(value)}
                        </nav>
                    ))}
                </div>
                {data && data.notes.length && (
                    <div className="content">
                        <Card type="simple" data={data.notes[0]} />
                        <div className="multi-card">
                            {data.notes[1] && <Card type="double" data={data.notes[1]} />}
                            {data.notes[2] && <Card type="double" data={data.notes[2]} />}
                        </div>
                        <div className="multi-card">
                            {data.notes[3] && <Card type="three" data={data.notes[3]} />}
                            {data.notes[4] && <Card type="three" data={data.notes[4]} />}
                            {data.notes[5] && <Card type="three" data={data.notes[5]} />}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state: RootState): StateProps => {
    return {
        notesType: state.app.notes.notesType,
        data: state.app.notes.data,
    };
};

export default connect(mapStateToProps)(Notes);
