import React from "react";

interface Props {}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(error: Error) {
        // invoked after an error has been thrown by a descendant component.
        return {hasError: true};
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        // log error information
        console.error(error, info);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
