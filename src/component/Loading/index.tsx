import React from "react";
import "./index.less";

interface Props {
    isLoading: boolean;
}

// TODO: 使用createPortal代替
export default class LoadingComponent extends React.PureComponent<Props> {
    render() {
        const {isLoading, children} = this.props;
        return (
            <React.Fragment>
                {isLoading && (
                    <div className="comp-loading-container g-full-screen">
                        <div className="loading-ball" />
                    </div>
                )}
                {children}
            </React.Fragment>
        );
    }
}
