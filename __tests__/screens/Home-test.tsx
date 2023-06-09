
// import 'react-native';
import React from 'react';

import renderer, { create, act } from 'react-test-renderer';
import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';

import Home from '../../src/screens/Home';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from '../../src/store';
import { navigation } from '../mock';

const store = createStore(reducer);

const tree = renderer.create(
    <Provider store={store}>
        <Home navigation={navigation} />
    </Provider>
);

describe('HomeScreen', () => {

    it('Should renders correctly component', () => {
        create(
            <Provider store={store}>
                <Home navigation={navigation} />
            </Provider>
        );
    });

    it('Should render snapshot', () => {
        expect(tree).toMatchSnapshot();
    });

    it('Should show the default text PressMe', () => {
        const { queryAllByText } = render(
            <Provider store={store}>
                <Home navigation={navigation} />
            </Provider>
        );


        queryAllByText('PressMe');
    });

    it('Should render myText component', () => {
        const { getByTestId, debug } = render(
            <Provider store={store}>
                <Home navigation={navigation} />
            </Provider>
        );

        const txtResult = getByTestId('myText');
        expect(txtResult).toBeDefined();
    });

    it('Should test when myButton is pressed', () => {
        const { getByTestId, getAllByTestId } = render(
            <Provider store={store}>
                <Home navigation={navigation} />
            </Provider>
        );

        const button = getByTestId('myButton');
        fireEvent.press(button);

        expect(screen.getAllByText('button pressed').length).toBe(1);
    });

    it('Should timeout to be called', async () => {

        // await act(() => {
        //     jest.runAllTimers();
        // });

        await waitFor(() => {
            const myText = tree.root.findByProps({ testID: 'myText' }).props;
            expect(myText.children).toEqual('timeout is called');
        });

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



