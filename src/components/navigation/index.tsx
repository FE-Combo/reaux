import React from "react";
import "./index.less";

interface Props {
    pageIndex: number;
    totalPage: number;
    onChange: (pageIndex: number) => void;
}

export default class Navigation<T> extends React.PureComponent<Props> {
    onPageChange = (changeValue: number) => {
        const {pageIndex, onChange} = this.props;
        onChange(pageIndex + changeValue);
    };

    render() {
        const {pageIndex, totalPage} = this.props;
        return (
            <div className="comp-navigation-container g-flex-between">
                <button onClick={() => this.onPageChange(-1)}>{pageIndex !== 1 && "上一页"}</button>
                <span>
                    第{pageIndex}页/第{totalPage}页
                </span>
                <button onClick={() => this.onPageChange(1)}>{pageIndex !== totalPage && "下一页"}</button>
            </div>
        );
    }
}
