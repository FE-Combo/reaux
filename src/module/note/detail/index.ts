import Component from "./component/Main";
import {register, Model} from "framework";
import {State} from "./type";
import {SagaIterator} from "redux-saga";

const initialState: State = {
    name: "string",
    data: null,
};

class ActionHandler extends Model<State> {
    *note(): SagaIterator {
        //
    }

    *onInitialized(): SagaIterator {
        // TODO: mock response
        const response = {
            title: "React Native 中的状态值",
            date: new Date(),
            content: `
                <img src="https://blog.whezh.com/content/images/2018/12/react_native.jpeg" />
                <p>最近在一个 React Native 项目中需要实现类似 iPhone 中调节亮度和声音的滑块组件。React Native 自带的 Slider 虽然支持一定的定制化，但是仍无法满足需求。在 GitHub 上搜索无果后，打算自己实现。最终实现的效果如下图所示。</p>
                <h3>基本思路</h3>
                <img src="https://blog.whezh.com/content/images/2018/12/step2.gif" />
                <p>这篇文章记录了实现的思路，源代码见 <a href="https://github.com">GitHub</a>，组件也发布到了 npm，通过 <strong>npm i react-native-column-slider</strong> 安装之后就可以在项目中使用了。</p>
                <p>最近在一个 React Native 项目中需要实现类似 iPhone 中调节亮度和声音的滑块组件。React Native 自带的 Slider 虽然支持一定的定制化，但是仍无法满足需求。在 GitHub 上搜索无果后，打算自己实现。最终实现的效果如下图所示。</p>
                <h3>基本思路</h3>
                <img src="https://blog.whezh.com/content/images/2018/12/step2.gif" />
                <p>这篇文章记录了实现的思路，源代码见 <a href="https://github.com">GitHub</a>，组件也发布到了 npm，通过 <strong>npm i react-native-column-slider</strong> 安装之后就可以在项目中使用了。</p>
            `,
        };
        yield* this.setState({data: response});
    }
}
export const {Controller, View} = register(new ActionHandler("note", initialState), Component);
