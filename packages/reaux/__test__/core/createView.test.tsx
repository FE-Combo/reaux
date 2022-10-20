import React from "react";
import {createStore} from "redux";
import {createReducer, createModuleReducer} from "../../src/core/createReducer";
import {createModel} from "../../src/core/createModel";
import {createApp} from "../../src/core/createApp";
import {createView} from "../../src/core/createView";
import {App} from "../../src/type";
import renderer, {ReactTestRendererJSON} from "react-test-renderer";

test("Create Component View", () => {
    const store = createStore(
        createReducer({
            main: createModuleReducer("main"),
            main2: createModuleReducer("main2"),
        })
    );
    const app: App = createApp(store);

    const Model = createModel(app);

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
                <div onClick={this.onToggle} {...this.props}>
                    {this.state.toggle ? "toggle component" : "component"}
                    <DIV />
                </div>
            );
        }
    }
    const NewComponent = createView(handler, Component);
    /* 
        Error: [test-renderer] Cannot read property `current` of undefined
        ref: https://github.com/facebook/react/issues/16323
        react and react-test-renderer must be same version
     */
    const newComponent = renderer.create(<NewComponent name="name" age={18} />);
    let tree: ReactTestRendererJSON | ReactTestRendererJSON[] = newComponent.toJSON()! as ReactTestRendererJSON;
    const newDIV = renderer.create(<DIV />);
    const divTree = newDIV.toJSON()!;
    expect(tree).toMatchSnapshot();
    expect(tree.type).toBe("div");
    expect(tree.children).toEqual(["component", divTree]);
    // TODO: Why not {name:"name", age:18 }
    expect(JSON.stringify(tree.props)).toEqual(JSON.stringify({name: "name", age: 18, onClick: () => {}}));

    // manually trigger the callback
    tree.props.onClick();
    // re-rendering
    tree = newComponent.toJSON()!;
    expect(tree).toMatchSnapshot();

    newComponent.update(<NewComponent />);
    newComponent.unmount();
});
