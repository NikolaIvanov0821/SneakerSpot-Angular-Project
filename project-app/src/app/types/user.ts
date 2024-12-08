import { Review } from "./product";

export interface User {
    _id: string;
    username: string;
    tel?: string;
    email: string;
    password: string;
    liked: string[];
    reviews: Review[];
    createdAt: string;
    updatedAt: string;
}

export interface UserForAuth {
    username: string;
    email: string;
    tel?: string;
    password: string;
    _id: string;
}
