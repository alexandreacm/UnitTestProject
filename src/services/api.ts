// import axios from 'axios';

// const BASE_URL = 'https://jsonplaceholder.typicode.com/';

// export const api = axios.create({
//     baseURL: BASE_URL
// });

export function APIRequest(who: string) {
    if (who === 'google') {
        return fetch('https://google.com')
            .then(response => response.json());
    } else {
        return 'no argument provided';
    }
}