const navigation: any = {
    navigate: jest.fn()
}

export type ActionType = {
    type: string;
    payload: any
}

export type State = {
    status: string;
}

const actionMock: ActionType = {
    type: 'setStatus',
    payload: jest.fn()
};


const initialState: State = {
    status: 'default store'
}

export { navigation, actionMock, initialState }