export interface Product {
    "_id": string,
    "name": string,
    "brand": string,
    "gender": string,
    "sizes": string[],
    "price": number,
    "colorway": string,
    "style": string,
    "info": string,
    "images": string[],
    "likes": string[]
}

export interface Review {
    "user": string,
    "title": string,
    "productId": string,
    "rating": number,
    "comment": string
}