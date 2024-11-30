import { Component, OnDestroy, OnInit, providePlatformInitializer } from '@angular/core';
import { Product } from '../types/product';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product!: Product;

  productImages: string[] = [


    // 'https://via.placeholder.com/150', // Replace with actual product image URLs
    // 'https://via.placeholder.com/150',
    // 'https://via.placeholder.com/150',
    // 'https://via.placeholder.com/150',
    // 'https://via.placeholder.com/150'
  ];

  selectedImageIndex = 0;
  selectedSize = '';

  constructor(private api: ApiService, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['productId']

    this.api.getProduct(id).subscribe((data) => {
      this.product = data;
      console.log(this.product);
      console.log(this.product.images);

      this.productImages = [
        this.product.images[0],
        this.product.images[1],
        this.product.images[2],
        this.product.images[3],
        this.product.images[4],
        this.product.images[5],
      ]
    })
  }

  selectImage(index: number): void {
    this.selectedImageIndex = index;
  }

  selectSize(size: string): void {
    this.selectedSize = size;
  }

  addToCart(): void {
    if (!this.selectedSize) {
      alert('Please select a size before adding to cart!');
    } else {
      alert(`${this.product.name} (Size: ${this.selectedSize}) added to cart!`);
    }
  }

  ngOnDestroy(): void {
    this.productImages = []
  }
}
