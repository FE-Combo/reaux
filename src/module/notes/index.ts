import Main from "./components/Main";
import {register, Handler, Listener} from "framework";
import {State} from "./type";
import {SagaIterator} from "redux-saga";
import {NotesType} from "type/api";

const initialState: State = {
    name: "string",
    notesType: NotesType.FRONTEND,
    data: null,
};

class ActionHandler extends Handler<State> implements Listener {
    *onInitialized(): SagaIterator {
        // TODO: wait for API
        yield* this.setState({
            data: {
                notes: [
                    {
                        imageURL: "https://blog.whezh.com/content/images/2018/12/react_native.jpeg",
                        title: "React Native 中的状态值",
                        content:
                            "在实际项目中，我们常常需要根据页面的不同去修改状态栏的表现。例如：页面头部图片延伸到状态栏下并且状态栏透明；状态栏的颜色和标题栏的颜色相同；状态栏内容颜色的深浅变化。 在此之前，我写了一篇React Navigation 构建 Android 和 iOS 统一的UI的文章，里面简单的说到了Android状态栏的一些设置。后来我发现并不是我想的那么简单，因此通过这篇博客进行补充，文中会更加详细的介绍状态栏相关的内容以及 React Native 项目中如何去控制状态栏，使应用在 iOS 和 Android 平台上都具有很好的表现。",
                    },
                    {
                        imageURL: "https://blog.whezh.com/content/images/2018/12/react_native.jpeg",
                        title: "React Native 中的状态值",
                        content:
                            "在实际项目中，我们常常需要根据页面的不同去修改状态栏的表现。例如：页面头部图片延伸到状态栏下并且状态栏透明；状态栏的颜色和标题栏的颜色相同；状态栏内容颜色的深浅变化。 在此之前，我写了一篇React Navigation 构建 Android 和 iOS 统一的UI的文章，里面简单的说到了Android状态栏的一些设置。后来我发现并不是我想的那么简单，因此通过这篇博客进行补充，文中会更加详细的介绍状态栏相关的内容以及 React Native 项目中如何去控制状态栏，使应用在 iOS 和 Android 平台上都具有很好的表现。",
                    },
                    {
                        imageURL: "https://blog.whezh.com/content/images/2018/12/react_native.jpeg",
                        title: "React Native 中的状态值",
                        content:
                            "在实际项目中，我们常常需要根据页面的不同去修改状态栏的表现。例如：页面头部图片延伸到状态栏下并且状态栏透明；状态栏的颜色和标题栏的颜色相同；状态栏内容颜色的深浅变化。 在此之前，我写了一篇React Navigation 构建 Android 和 iOS 统一的UI的文章，里面简单的说到了Android状态栏的一些设置。后来我发现并不是我想的那么简单，因此通过这篇博客进行补充，文中会更加详细的介绍状态栏相关的内容以及 React Native 项目中如何去控制状态栏，使应用在 iOS 和 Android 平台上都具有很好的表现。",
                    },
                    {
                        imageURL: "https://blog.whezh.com/content/images/2018/12/react_native.jpeg",
                        title: "React Native 中的状态值",
                        content:
                            "在实际项目中，我们常常需要根据页面的不同去修改状态栏的表现。例如：页面头部图片延伸到状态栏下并且状态栏透明；状态栏的颜色和标题栏的颜色相同；状态栏内容颜色的深浅变化。 在此之前，我写了一篇React Navigation 构建 Android 和 iOS 统一的UI的文章，里面简单的说到了Android状态栏的一些设置。后来我发现并不是我想的那么简单，因此通过这篇博客进行补充，文中会更加详细的介绍状态栏相关的内容以及 React Native 项目中如何去控制状态栏，使应用在 iOS 和 Android 平台上都具有很好的表现。",
                    },
                    {
                        imageURL: "https://blog.whezh.com/content/images/2018/12/react_native.jpeg",
                        title: "React Native 中的状态值",
                        content:
                            "在实际项目中，我们常常需要根据页面的不同去修改状态栏的表现。例如：页面头部图片延伸到状态栏下并且状态栏透明；状态栏的颜色和标题栏的颜色相同；状态栏内容颜色的深浅变化。 在此之前，我写了一篇React Navigation 构建 Android 和 iOS 统一的UI的文章，里面简单的说到了Android状态栏的一些设置。后来我发现并不是我想的那么简单，因此通过这篇博客进行补充，文中会更加详细的介绍状态栏相关的内容以及 React Native 项目中如何去控制状态栏，使应用在 iOS 和 Android 平台上都具有很好的表现。",
                    },
                    {
                        imageURL: "https://blog.whezh.com/content/images/2018/12/react_native.jpeg",
                        title: "React Native 中的状态值",
                        content:
                            "在实际项目中，我们常常需要根据页面的不同去修改状态栏的表现。例如：页面头部图片延伸到状态栏下并且状态栏透明；状态栏的颜色和标题栏的颜色相同；状态栏内容颜色的深浅变化。 在此之前，我写了一篇React Navigation 构建 Android 和 iOS 统一的UI的文章，里面简单的说到了Android状态栏的一些设置。后来我发现并不是我想的那么简单，因此通过这篇博客进行补充，文中会更加详细的介绍状态栏相关的内容以及 React Native 项目中如何去控制状态栏，使应用在 iOS 和 Android 平台上都具有很好的表现。",
                    },
                ],
                totalRecord: 10,
                totalPage: 10,
            },
        });
    }

    *changeNotesNav(notesType: NotesType): SagaIterator {
        yield* this.setState({notesType});
    }

    *test(): SagaIterator {
        yield* this.setState({name: "voco"});
    }
}
const actions = register(new ActionHandler("notes", initialState));
export {actions, Main};
