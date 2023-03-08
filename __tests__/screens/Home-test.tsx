
// import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer, { create, act } from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';

import Home from '../../src/screens/Home';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from '../../src/store';

const navigation = {
    navigate: jest.fn()
}

const store = createStore(reducer, { status: 'default store' });

const tree = renderer.create(
    <Provider store={store}>
        <Home navigation={navigation} />
    </Provider>
);

describe('all tests', () => {

    test('Should run Snapshot test', () => {
        expect(tree).toMatchSnapshot();
    });

    test('Should renders correctly', () => {
        create(
            <Provider store={store}>
                <Home navigation={navigation} />
            </Provider>
        );
    });

    test('Should show the default text PressMe', () => {
        const { queryAllByText } = render(
            <Provider store={store}>
                <Home navigation={navigation} />
            </Provider>
        );

        queryAllByText('PressMe');
    });

    test('Should render the test statusItem', () => {
        const { getByTestId, debug } = render(
            <Provider store={store}>
                <Home navigation={navigation} />
            </Provider>
        );

        const txtResult = getByTestId('myText');
        const button = getByTestId('myButton');

        fireEvent.press(button);

        expect(txtResult).toBeDefined();

        // debug();
    });

    it('button press with react test renderer', () => {
        const myButton = tree.root.findByProps({ testID: 'myButton' }).props;
        act(() => myButton.onPress());

        const text = tree.root.findByProps({ testID: 'myText' }).props;

        expect(text.children).toEqual('button pressed');
    });

    it('timeout is called', () => {
        act(() => jest.runAllTimers());

        const myText = tree.root.findByProps({ testID: 'myText' }).props;
        expect(myText.children).toEqual('timeout is called');
    });

    it('Should navigate to details page', () => {

        const myButton = tree.root.findByProps({ testID: 'myNavigateButton' }).props;
        myButton.onPress();

        expect(navigation.navigate).toBeCalledWith('Details');
    });

    it('Should navigate to details page with @testing-library', () => {

        const { getByTestId } = render(
            <Provider store={store}>
                <Home navigation={navigation} />
            </Provider>
        );

        const navigateButton = getByTestId('myNavigateButton');
        fireEvent.press(navigateButton);

        expect(navigation.navigate).toBeCalledWith('Details');
    });

    it('Should status store properly', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <Home navigation={navigation} />
            </Provider>
        );

        const button = getByTestId('myButtonRedux');
        // const button = tree.root.findByProps({ testID: 'myButtonRedux' }).props;
        fireEvent.press(button);

        expect(store.getState().status).toEqual('Redux timeout is called');
    });
});



