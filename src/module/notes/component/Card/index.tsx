import React from "react";
import "./index.less";
import {SearchNotesAJAXResponse$Notes} from "type/api";

interface Props {
    type: "simple" | "double" | "three";
    // simple image size: 680*320, simple image size: 500*200, three image size: 320*200
    data: SearchNotesAJAXResponse$Notes;
    onClick: (noteId: string) => void;
}

export default class Card extends React.PureComponent<Props> {
    render() {
        const {type, data, onClick} = this.props;
        return (
            <div className={`card-container ${type}`} onClick={() => onClick(data.noteId)}>
                <div className="card-image" style={{backgroundImage: `url(${data.imageURL})`}} />
                <div>
                    <h1>{data.title}</h1>
                    <p>{data.content}</p>
                </div>
            </div>
        );
    }
}
