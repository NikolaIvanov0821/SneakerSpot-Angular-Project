import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "./types/product";
import { enviroment } from "../enviroments/environment";


@Injectable({
    providedIn: "root"
})
export class ApiService {
    
    constructor(private http: HttpClient) {}

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
        return this.http.post<Product>(url + "/products", data)
    }

    register(data: any) {
        const url = enviroment.apiUrl;
        return this.http.post(url + '/users/register', data)
    }
}