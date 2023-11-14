import React from "react";
import {connect, DispatchProp, ConnectedComponent} from "react-redux";
import {ReactLifecycleException} from "../core/exception";

export interface ErrorBoundaryProps extends DispatchProp<any> {
    fallback?: (exception?: ReactLifecycleException) => React.ReactNode;
    children: React.ReactNode;
}

interface State {
    exception: ReactLifecycleException | null;
}

class Component extends React.PureComponent<ErrorBoundaryProps, State> {
    static defaultProps: Pick<ErrorBoundaryProps, "fallback"> = {fallback: () => null};
    state: State = {exception: null};

    componentDidUpdate(prevProps: ErrorBoundaryProps) {
        // Support page recovery
        if (this.props.children !== prevProps.children) {
            this.setState({exception: null});
        }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        const exception = new ReactLifecycleException(error.message, errorInfo.componentStack);
        this.setState({exception});
    }

    render() {
        return this.state.exception ? this.props.fallback?.call({dispatch: this.props.dispatch}, this.state.exception) : this.props.children;
    }
}

export const ErrorBoundary: ConnectedComponent<typeof Component, Pick<ErrorBoundaryProps, "children" | "fallback">> = connect()(Component);
