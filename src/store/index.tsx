
type ActionType = {
    type: string;
    payload: any
}

const initialState = {
    status: ''
}

export function reducer(state = initialState, action: ActionType) {
    switch (action.type) {
        case 'setStatus':
            return { ...state, status: action.payload };
        default:
            return state
    }
}