export interface User {
    _id: string,
    username: string,
    tel:string
    email: string,
    password: string,
    liked: string[],
    reviews: string[],
    createdAt: string,
    updatedAt: string
}