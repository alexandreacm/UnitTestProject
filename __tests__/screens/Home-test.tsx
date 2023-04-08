
// import 'react-native';
import React from 'react';

import renderer, { create, act } from 'react-test-renderer';
import { render, fireEvent, screen } from '@testing-library/react-native';

import Home from '../../src/screens/Home';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from '../../src/store';

const navigation: any = {
    navigate: jest.fn()
}

const store = createStore(reducer, { status: 'default store' });

const tree = renderer.create(
    <Provider store={store}>
        <Home navigation={navigation} />
    </Provider>
);

describe('HomeScreen', () => {

    test('Should renders correctly component', () => {
        create(
            <Provider store={store}>
                <Home navigation={navigation} />
            </Provider>
        );
    });

    test('Should render snapshot', () => {
        expect(tree).toMatchSnapshot();
    });

    test('Should show the default text PressMe', () => {
        const { queryAllByText } = render(
            <Provider store={store}>
                <Home navigation={navigation} />
            </Provider>
        );

        // screen.debug();
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

    it('Should timeout to be called', () => {
        jest.runAllTimers();

        const myText = tree.root.findByProps({ testID: 'myText' }).props;
        expect(myText.children).toEqual('timeout is called');
    });

    it('Should useEffect is called with @react-testing-library/react-native', () => {
        const { queryByText } = render(
            <Provider store={store}>
                <Home navigation={navigation} />
            </Provider>)

        queryByText('effect is called');
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
        fireEvent.press(button);

        expect(store.getState().status).toEqual('Redux timeout is called');
    });

    it('Should status store properly with react-test-renderer', () => {
        const button = tree.root.findByProps({ testID: 'myButtonRedux' }).props;
        button.onPress();

        expect(store.getState().status).toEqual('Redux timeout is called');
    });
});



