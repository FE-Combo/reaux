import Component from './component/Main';
import {register, Model} from 'reaux-native';
import {State} from './type';
// import {SagaIterator} from 'redux-saga/index';

const initialState = {
    name: 'main',
};

class ActionHandler extends Model<State> {
    test() {
        this.setState({name: 'new main'});
    }
}
export const {actions, View} = register(
    new ActionHandler('main', initialState),
    Component,
);
