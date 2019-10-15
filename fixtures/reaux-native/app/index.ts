import {start} from 'reaux-native';
import {View} from './module/main';

export function startApp() {
    start({
        name: 'AwesomeProject',
        Component: View,
    });
}
