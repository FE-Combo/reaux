import React from "react";
import {connect, DispatchProp} from "react-redux";
import {RootState} from "type/state";
import {SearchNoteAJAXResponse} from "type/api";
import {getDateFormat} from "util/date";
import "./index.less";

interface StateProps {
    data: SearchNoteAJAXResponse | null;
}

interface Props extends StateProps, DispatchProp {}

class Note extends React.PureComponent<Props> {
    render() {
        const {data} = this.props;
        return (
            data && (
                <div className="note-container content">
                    <h1>{data.title}</h1>
                    <h6>{"编辑于" + getDateFormat(data.date)}</h6>
                    <div dangerouslySetInnerHTML={{__html: data.content}} />
                </div>
            )
        );
    }
}

const mapStateToProps = (state: RootState): StateProps => {
    return {
        data: state.app.noteDetail.data,
    };
};

export default connect(mapStateToProps)(Note);
