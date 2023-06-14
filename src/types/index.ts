
export interface Post {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export interface Geo {
    la: string;
    lng: string;
}

export type Address = {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}
export interface IUser {
    id: number,
    name: string,
    username: string,
    email: string,
    phone: string,
    address: Address,
}
