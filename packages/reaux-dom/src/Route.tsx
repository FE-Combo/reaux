import React from "react";
import {RouteProps} from "react-router";
import {Redirect, Route as ReactRoute} from "react-router-dom";
import {ErrorBoundary, setErrorAction} from "reaux";

type PickOptional<T> = Pick<T, {[K in keyof T]-?: {} extends {[P in K]: T[K]} ? K : never}[keyof T]>;

interface OwnProps {
    withErrorBoundary?: boolean;
    accessCondition?: boolean;
    unauthorizedRedirectTo?: string;
}

type Props = OwnProps & RouteProps;

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
        return withErrorBoundary ? <ErrorBoundary onError={setErrorAction}>{routeNode}</ErrorBoundary> : routeNode;
    }
}
