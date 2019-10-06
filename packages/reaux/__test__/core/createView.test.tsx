import React from "react";
import {createCView} from "../../src/core/createView";
import renderer from "react-test-renderer";

test("Create Component View", () => {
    class Model {
        moduleName: string;
        initState: any;
        state: any;
        rootState: any;
        setState: any;
        constructor(moduleName: string, state: any) {
            this.moduleName = moduleName;
            this.state = state;
        }
        onReady() {}
        onLoad() {}
        onUnload() {}
        onHide() {}
    }
    const handler = new Model("module", {});
    class DIV extends React.PureComponent {
        render() {
            return <div>text</div>;
        }
    }
    class Component extends React.PureComponent<any, any> {
        constructor(props: any) {
            super(props);
            this.state = {toggle: false};
        }

        onToggle = () => this.setState({toggle: !this.state.toggle});

        render() {
            return (
                <div onClick={this.onToggle}>
                    {this.state.toggle ? "toggle component" : "component"}
                    <DIV />
                </div>
            );
        }
    }
    const NewComponent = createCView(handler, Component);
    /* 
        Error: [test-renderer] Cannot read property `current` of undefined
        ref: https://github.com/facebook/react/issues/16323
        react and react-test-renderer be same version
     */
    const newComponent = renderer.create(<NewComponent name="name" age={18} />);
    let tree = newComponent.toJSON()!;
    const newDIV = renderer.create(<DIV />);
    let divTree = newDIV.toJSON()!;
    expect(tree).toMatchSnapshot();
    expect(tree.type).toBe("div");
    expect(tree.children).toEqual(["component", divTree]);
    // TODO: Jest error
    // expect(tree.props).toEqual({name: "name", age: 18});

    // manually trigger the callback
    tree.props.onClick();
    // re-rendering
    tree = newComponent.toJSON()!;
    expect(tree).toMatchSnapshot();

    newComponent.update(<NewComponent />);
    newComponent.unmount();
});
