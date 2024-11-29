import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from '../types/product';

@Component({
  selector: 'app-products-catalog',
  standalone: true,
  imports: [],
  templateUrl: './products-catalog.component.html',
  styleUrl: './products-catalog.component.css'
})
export class ProductsCatalogComponent implements OnInit {
  products: Product[] = [];
  constructor(private api: ApiService) { }

  ngOnInit(): void {

    this.api.getProducts().subscribe((data) => {
      this.products = data;
    })
  }
}
