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

        return this.http.get<Product[]>(url + "/products")
    }

    createProduct(data: any) {
        const url = enviroment.apiUrl;
        return this.http.post<Product>(url + "/products", data)
    }
}