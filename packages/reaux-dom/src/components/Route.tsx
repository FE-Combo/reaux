import * as React from "react";
import {RouteProps} from "react-router";
import {ErrorBoundary, setErrorAction} from "reaux";
import {Redirect, Route as ReactRoute} from "react-router-dom";

type PickOptional<T> = Pick<T, {[K in keyof T]-?: {} extends {[P in K]: T[K]} ? K : never}[keyof T]>;

interface Props extends RouteProps {
    withErrorBoundary?: boolean;
    accessCondition?: boolean;
    unauthorizedRedirectTo?: string;
}

export class Route extends React.PureComponent<Props> {
    public static defaultProps: PickOptional<Props> = {
        exact: true,
        withErrorBoundary: true,
        accessCondition: true,
        unauthorizedRedirectTo: "/",
    };

    render() {
        const {component, withErrorBoundary, accessCondition, unauthorizedRedirectTo, ...restProps} = this.props;
        const TargetComponent = component!;
        const routeNode = (
            <ReactRoute
                {...restProps}
                render={props => {
                    return accessCondition ? <TargetComponent {...props} /> : <Redirect to={{pathname: unauthorizedRedirectTo}} />;
                }}
            />
        );
        return withErrorBoundary ? <ErrorBoundary setErrorAction={setErrorAction}>{routeNode}</ErrorBoundary> : routeNode;
    }
}
