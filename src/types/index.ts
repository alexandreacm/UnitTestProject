export interface Post {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export interface IUser {
    id: number;
    name: string;
    username: string;
    email: string;
}