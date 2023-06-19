
// import 'react-native';
import React from 'react';

import renderer, { create, act } from 'react-test-renderer';
import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';

import Home from '../../src/screens/Home';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from '../../src/store';
import { mocks } from '../__mock__';
import fetchMock from 'jest-fetch-mock';
import { APIRequest, BASE_URL } from '../../src/services/api';

import axiosMock from '../__mock__/axios';
import axios from 'axios';

const store = createStore(reducer);

const tree = renderer.create(
    <Provider store={store}>
        <Home navigation={mocks.navigation} />
    </Provider>
);

describe('HomeScreen', () => {

    it('Should render correctly component', () => {
        render(
            <Provider store={store}>
                <Home navigation={mocks.navigation} />
            </Provider>
        );
    });

    it('Should render snapshot', () => {
        // expect(tree).toMatchSnapshot();
        render(
            <Provider store={store}>
                <Home navigation={mocks.navigation} />
            </Provider>
        );


        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('Should show the default text PressMe', () => {
        const { queryAllByText } = render(
            <Provider store={store}>
                <Home navigation={mocks.navigation} />
            </Provider>
        );


        queryAllByText('PressMe');
    });

    it('Should render myText component', () => {
        const { getByTestId, debug } = render(
            <Provider store={store}>
                <Home navigation={mocks.navigation} />
            </Provider>
        );

        const txtResult = getByTestId('myText');
        expect(txtResult).toBeDefined();
    });

    it('Should test the status state', async () => {
        const { getByTestId, findByText, debug } = render(
            <Provider store={store}>
                <Home navigation={mocks.navigation} />
            </Provider>
        );

        const text = 'timeout is called';

        await findByText(text);
        const myText = getByTestId('myText');

        // console.log(myText.props.children)
        expect(myText.props.children).toEqual(text);
    });

    it('Should test when myButton is pressed', () => {
        const { getByTestId, getAllByTestId } = render(
            <Provider store={store}>
                <Home navigation={mocks.navigation} />
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
                <Home navigation={mocks.navigation} />
            </Provider>)

        queryByText('effect is called');
    });

    it('Should navigate to details page', () => {

        const myButton = tree.root.findByProps({ testID: 'myNavigateButton' }).props;
        myButton.onPress();

        expect(mocks.navigation.navigate).toBeCalledWith('Details');
    });

    it('Should navigate to details page with @testing-library', () => {

        const { getByTestId } = render(
            <Provider store={store}>
                <Home navigation={mocks.navigation} />
            </Provider>
        );

        const navigateButton = getByTestId('myNavigateButton');
        fireEvent.press(navigateButton);

        expect(mocks.navigation.navigate).toBeCalledWith('Details');
    });

    it('Should status store properly', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <Home navigation={mocks.navigation} />
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

    describe('Testing API', () => {
        beforeEach(() => {
            fetchMock.resetMocks();
        });

        test('should display how async / await works with reject', async () => {
            const err = Promise.reject('something went wrong');

            err.then(err => {
                expect(err).toBe('something went wrong');
            })

        });

        test('Should call google and return mock data', async () => {

            fetchMock.mockResponseOnce(JSON.stringify({ data: '12345' }));

            const response = await APIRequest('google');

            expect(response.data).toEqual('12345');
            expect(fetchMock).toHaveBeenCalledTimes(1);
        });

        test('Should test if google was called', async () => {

            fetchMock.mockResponseOnce(JSON.stringify({ data: '12345' }));

            await APIRequest('google');

            expect(fetchMock.mock.calls.length).toEqual(1);
            expect(fetchMock.mock.calls[0][0]).toBe('https://google.com');
        });

        test('Should test if google was called with an object', async () => {

            fetchMock.mockResponseOnce(JSON.stringify(mocks.userObjMock));

            const response = await APIRequest('google');

            expect(fetchMock).toHaveBeenCalledTimes(1);
            expect(response).toEqual(mocks.userObjMock)
        });

        it('Should call google with a mock of axios', async () => {
            await axiosMock.get('https://google.com');

            expect(axiosMock.get).toHaveBeenCalledTimes(1);
        });

        it('Should call Json place holder', async () => {

            // const spyFn = jest.spyOn(axiosMock, 'get')
            //     .mockImplementation(() => {
            //         Promise.resolve({ data: mocks.users })
            //     });

            // const spyFn = jest.spyOn(axiosMock, 'get');
            jest.spyOn(axiosMock, 'get').mockResolvedValueOnce({ data: mocks.users });

            const response = await axiosMock.get(BASE_URL);

            // console.log(response.data[0])
            expect(response.data.length).toEqual(3);
            expect(JSON.stringify(response.data[0])).toBe(JSON.stringify(mocks.userMock));
        });

        test('Should test when the parameter who is not filled', async () => {
            const response = await APIRequest('');

            expect(fetchMock).toHaveBeenCalledTimes(0);
            expect(response).toBe('no argument provided')
        });
    })
});



