
// import 'react-native';
import React from 'react';

import renderer, { create, act } from 'react-test-renderer';
import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';

import Home from '../../src/screens/Home';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from '../../src/store';
import { navigation } from '../__mock__';
import fetchMock from 'jest-fetch-mock';
import { APIRequest } from '../../src/services/api';

import axiosMock from '../__mock__/axios';
import axios from 'axios';

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

    test('show display how async / await works', async () => {
        const value = await Promise.resolve(true);
        expect(value).toBe(true);
    });

    test('should display how async / await works with reject', async () => {
        const err = Promise.reject('something went wrong');

        err.then(err => {
            expect(err).toBe('something went wrong');
        })

    });

    describe('Testing API', () => {
        beforeEach(() => {
            fetchMock.resetMocks();
        });

        test('Should call google and return mock data', async () => {
            fetchMock.mockResponseOnce(JSON.stringify({ data: '12345' }));

            const response = await APIRequest('google');
            expect(response.data).toEqual('12345')
        });

        test('Should test if google was called', async () => {
            fetchMock.mockResponseOnce(JSON.stringify({ data: '12345' }));

            await APIRequest('google');

            expect(fetchMock.mock.calls.length).toEqual(1);
            expect(fetchMock.mock.calls[0][0]).toBe('https://google.com');
        });

        test('Should test if google was called 1', async () => {

            const userMock = {
                id: 1,
                name: 'Leanne Graham',
                username: 'Bret',
                email: 'Sincere@april.biz',
            }

            fetchMock.mockResponseOnce(JSON.stringify(userMock));

            const response = await APIRequest('google');

            expect(fetchMock).toHaveBeenCalledTimes(1);
            expect(response).toEqual(userMock)
        });

        it('Should call google with 1 time', async () => {
            await axiosMock.get('https://google.com');

            expect(axiosMock.get).toHaveBeenCalledTimes(1);
        });

        it('Should call google with other method', async () => {

            jest.spyOn(axiosMock, 'get').mockResolvedValueOnce({ data: '102030' });

            const response = await axiosMock.get('https://google.com');
            // const response = await axios.get('https://google.com');

            expect(response.data).toEqual('102030');
        })
    })
});



