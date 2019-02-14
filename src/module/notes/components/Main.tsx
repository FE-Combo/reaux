import React from "react";
import {connect, DispatchProp} from "react-redux";
import {actions} from "module/notes";
import {NotesType} from "type/api";
import {getNotesTypeName} from "utils/lang";
import {objectToArray} from "framework/utils";
import {RootState} from "type/state";
import Card from "./Card";
import "./index.less";

interface StateProps {
    notesType: NotesType;
}

interface Props extends StateProps, DispatchProp {}

class Notes extends React.PureComponent<Props> {
    onNotesNavClick = (type: NotesType) => this.props.dispatch(actions.changeNotesNav(type));

    render() {
        const {notesType} = this.props;
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
                <div className="content">
                    <Card type={1} notesType={notesType} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState): StateProps => {
    return {
        notesType: state.app.notes.notesType,
    };
};

export default connect(mapStateToProps)(Notes);
