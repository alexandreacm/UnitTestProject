type ActionType = {
    type: string;
    payload: any
}

export type State = {
    status: string;
}

const initialState: State = {
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

export const selectStatus = (state: State) => state.status;