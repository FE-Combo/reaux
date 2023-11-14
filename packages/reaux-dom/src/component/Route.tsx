import React from "react";
import {RouteProps} from "react-router";
import {Redirect, Route as ReactRoute} from "react-router-dom";
import {ErrorBoundary, ErrorBoundaryProps} from "reaux";

type PickOptional<T> = Pick<T, {[K in keyof T]-?: {} extends {[P in K]: T[K]} ? K : never}[keyof T]>;

interface OwnProps {
    withErrorBoundary?: boolean;
    accessCondition?: boolean;
    unauthorizedRedirectTo?: string;
    errorBoundaryFallback?: ErrorBoundaryProps["fallback"];
}

type Props = OwnProps & RouteProps;

export class Route extends React.PureComponent<Props> {
    public static defaultProps: PickOptional<Props> = {
        exact: true,
        withErrorBoundary: false,
        accessCondition: true,
        unauthorizedRedirectTo: "/",
    };

    render() {
        const {component, withErrorBoundary, accessCondition, unauthorizedRedirectTo, errorBoundaryFallback, ...restProps} = this.props;
        const TargetComponent = component!;
        const routeNode = (
            <ReactRoute
                {...restProps}
                render={(props) => {
                    return accessCondition ? <TargetComponent {...props} /> : <Redirect to={{pathname: unauthorizedRedirectTo}} />;
                }}
            />
        );
        return withErrorBoundary ? <ErrorBoundary fallback={errorBoundaryFallback}>{routeNode}</ErrorBoundary> : routeNode;
    }
}
