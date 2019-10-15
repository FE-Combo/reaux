import Component from './component/Main';
import {register, GModel} from 'reaux-native/index';
import {State} from './type';
import {SagaIterator} from 'redux-saga/index';

const initialState: State = {
    name: 'main',
};

class ActionHandler extends GModel<State> {
    *test(): SagaIterator {
        this.setState({name: 'new main'});
    }
}
export const {actions, View} = register(
    new ActionHandler('main', initialState),
    Component,
);
