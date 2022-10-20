## 环境配置
- https://reactnative.dev/docs/environment-setup

## Template
- npx react-native init AwesomeTSProject --template react-native-template-typescript


## Q&A
### xcrun: error: unable to find utility "simctl", not a developer tool or in PATH
- https://stackoverflow.com/questions/29108172/how-do-i-fix-the-xcrun-unable-to-find-simctl-error

### Failed to build iOS project. We ran "xcodebuild" command but it exited with error code 65. To debug build logs further, consider building your app with Xcode.app, by opening AwesomeProject.xcworkspace.
- ios文件下丢失Pods文件，安装pods
- gem install cocoapods
- cd ios
- pod install（m1系统使用：arch -x86_64 pod install）

### `yarn link-native` unknown command 'link'
- https://stackoverflow.com/questions/72872203/unrecognized-command-link-when-linking-fonts-in-react-native


## 初始化模板报错：Your Ruby version is 2.7.6, but your Gemfile specified 2.7.5?
- 切换ruby版本2.7.5
- brew install rbenv ruby-build
- rbenv install 2.7.5
- rbenv global 2.7.5
- rbenv local 2.7.5
- rvm install "ruby-2.7.5"