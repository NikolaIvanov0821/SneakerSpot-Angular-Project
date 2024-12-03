import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from '../types/product';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-products-catalog',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './products-catalog.component.html',
  styleUrl: './products-catalog.component.css'
})
export class ProductsCatalogComponent implements OnInit {
  products: Product[] = [];
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getProducts().subscribe((data) => {
      this.products = data;
      console.log(this.products);
    })
  }

  get isLoggedIn(): boolean {
    let isLogged = false;
    if (localStorage.getItem('user')) {
      isLogged = true;
    }
    return isLogged;
  }
}
