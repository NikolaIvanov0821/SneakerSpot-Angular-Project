import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product, Review } from "./types/product";
import { enviroment } from "../enviroments/environment";
import { runPostSignalSetFn } from "@angular/core/primitives/signals";


@Injectable({
    providedIn: "root"
})
export class ApiService {

    constructor(private http: HttpClient) { }

    getProducts() {
        const url = enviroment.apiUrl
        const result = this.http.get<Product[]>(url + "/products")
        return result
    }

    getProduct(productId: string) {
        const url = enviroment.apiUrl;
        const result = this.http.get<Product>(url + "/products/" + productId)
        return result
    }

    createProduct(data: Product) {
        const url = enviroment.apiUrl;
        return this.http.post<Product>(url + "/products", data);
    }

    getLikes(productId: string) {
        const url = enviroment.apiUrl;
        const result = this.http.get<[]>(url + `/products/${productId}/likes`);
        return result;
    }

    likeProduct(productId: string, userId: string) {
        const url = enviroment.apiUrl;
        const result = this.http.post(url + `/products/${productId}/likes`, { productId, userId });
        return result;
    }

    unlikeProduct(productId: string, userId: string) {
        const url = enviroment.apiUrl;
        const result = this.http.put(url + `/products/${productId}/likes`, { productId, userId });
        return result;
    }

    postReview(user: string, title: string, productId: string, rating: number, comment: string) {
        const url = enviroment.apiUrl;
        const review: Review = { user, title, productId, rating, comment };
        const result = this.http.post(url + `/products/${productId}/reviews`, review);
        return result;
    }

    getReviews(productId: string) {
        const url = enviroment.apiUrl;
        const result = this.http.get<Review[]>(url + `/products/${productId}/reviews`);
        return result;
    }
}