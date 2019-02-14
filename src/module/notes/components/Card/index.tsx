import React from "react";
import "./index.less";
import {NotesType} from "type/api";
import {getNotesTypeName} from "utils/lang";

interface Props {
    type: 1 | 2 | 3;
    notesType: NotesType;
}

export default class Card extends React.PureComponent<Props> {
    render() {
        const {type, notesType} = this.props;
        return (
            <div className="card-container">
                <img src="https://blog.whezh.com/content/images/2018/12/react_native.jpeg" />
                <div>
                    <nav>{getNotesTypeName(notesType)}</nav>
                    <h1>React Native 中的状态值</h1>
                    <p>
                        在实际项目中，我们常常需要根据页面的不同去修改状态栏的表现。例如：页面头部图片延伸到状态栏下并且状态栏透明；状态栏的颜色和标题栏的颜色相同；状态栏内容颜色的深浅变化。 在此之前，我写了一篇React Navigation 构建 Android 和 iOS 统一的 UI的文章，里面简单的说到了 Android
                        状态栏的一些设置。后来我发现并不是我想的那么简单，因此通过这篇博客进行补充，文中会更加详细的介绍状态栏相关的内容以及 React Native 项目中如何去控制状态栏，使应用在 iOS 和 Android 平台上都具有很好的表现。
                    </p>
                </div>
            </div>
        );
    }
}
