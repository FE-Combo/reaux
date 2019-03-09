import React from "react";
import {connect, DispatchProp} from "react-redux";
import {actions} from "module/notes";
import {NotesType, SearchNotesAJAXResponse} from "type/api";
import {getNotesTypeName} from "util/lang";
import {objectToArray} from "framework/util";
import {actions as homeActions} from "module/home";
import {RootState} from "type/state";
import Card from "./Card";
import Navigation from "component/navigation";
import "./index.less";

interface StateProps {
    notesType: NotesType;
    data: SearchNotesAJAXResponse | null;
}

interface Props extends StateProps, DispatchProp {}

class Notes extends React.PureComponent<Props> {
    onNotesNavClick = (type: NotesType) => this.props.dispatch(actions.changeNotesNav(type));

    onCardClick = (noteId: string) => this.props.dispatch(actions.goToViewNote(noteId));

    onNavigationChange = (pageIndex: number) => {
        /** Q：尝试 pageIndex 导出类型自动推导为 number，而不需要人为定义number?
         *  A：onNavigationChange 不在 Navigation 的上下文中，所以 abstract function 的方法无法推导出与 Navigation->onChange 一样的参数类型。只有使用 inline function 可以推导。
         */
        // TODO: complete logic,
    };

    render() {
        const {data, notesType, dispatch} = this.props;
        return (
            <div className="notes-container">
                <h1>知识改变命运</h1>
                <div className="tag g-flex-center">
                    <nav onClick={() => dispatch(homeActions.pushHistory("/"))}>首页</nav>
                    {objectToArray(NotesType, (key, value) => (
                        <nav key={key} onClick={() => this.onNotesNavClick(value)}>
                            {getNotesTypeName(value)}
                        </nav>
                    ))}
                </div>
                {data && data.notes.length && (
                    <div className="content">
                        <Card type="simple" data={data.notes[0]} onClick={this.onCardClick} />
                        <div className="multi-card">
                            {data.notes[1] && <Card type="double" data={data.notes[1]} onClick={this.onCardClick} />}
                            {data.notes[2] && <Card type="double" data={data.notes[2]} onClick={this.onCardClick} />}
                        </div>
                        <div className="multi-card">
                            {data.notes[3] && <Card type="three" data={data.notes[3]} onClick={this.onCardClick} />}
                            {data.notes[4] && <Card type="three" data={data.notes[4]} onClick={this.onCardClick} />}
                            {data.notes[5] && <Card type="three" data={data.notes[5]} onClick={this.onCardClick} />}
                        </div>
                        <Navigation pageIndex={1} totalPage={data.totalPage} onChange={this.onNavigationChange} />
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
