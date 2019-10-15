import {start} from 'reaux-native/index';
import {View} from './module/main';

export function startApp() {
    start({
        name: 'AwesomeProject',
        Component: View,
    });
}
