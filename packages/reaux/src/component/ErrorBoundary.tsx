import React from "react";
import {connect, DispatchProp, ConnectedComponentClass} from "react-redux";
import {ActionType} from "../type";
export abstract class Exception {
    protected constructor(public message: string) {}
}

class ReactLifecycleException extends Exception {
    constructor(public message: string, public componentStack: string) {
        super(message);
    }
}

interface Props extends DispatchProp<any> {
    render: (exception: ReactLifecycleException) => React.ReactNode;
    children: React.ReactNode;
    setErrorAction: (exception: ReactLifecycleException) => ActionType<ReactLifecycleException>;
}

interface State {
    exception: ReactLifecycleException | null;
}

class Component extends React.PureComponent<Props, State> {
    static defaultProps: Pick<Props, "render"> = {render: () => null};
    state: State = {exception: null};

    componentDidUpdate(prevProps: Props) {
        // Support page recovery
        if (this.props.children !== prevProps.children) {
            this.setState({exception: null});
        }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        const {dispatch, setErrorAction} = this.props;
        const exception = new ReactLifecycleException(error.message, errorInfo.componentStack);
        dispatch(setErrorAction(exception));
        this.setState({exception});
    }

    render() {
        return this.state.exception ? this.props.render(this.state.exception) : this.props.children;
    }
}

const ErrorBoundary: ConnectedComponentClass<typeof Component, Pick<Props, "render" | "children" | "setErrorAction">> = connect()(Component);

export default ErrorBoundary;
