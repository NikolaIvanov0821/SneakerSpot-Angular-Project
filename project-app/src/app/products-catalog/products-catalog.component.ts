import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from '../types/product';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../types/user';


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

  isLiked(productId: string): boolean {
    let isLiked = false

    const user = JSON.parse(localStorage.getItem('user')!);
    const userId = user._id;

    this.api.getLikes(productId).subscribe((data) => {
      if (data.hasOwnProperty(userId)) {
        isLiked = true
      }
    })

    return isLiked
  }

  like(productId: string) {
    this.api.getLikes(productId).subscribe((data) => console.log(data))

    const user = JSON.parse(localStorage.getItem('user')!);
    const userId = user._id;

    this.api.likeProduct(productId, userId).subscribe((updatedLikes) => {
        console.log("Updated likes:", updatedLikes);
    }, (error) => {
        console.error("Error liking product:", error);
    });
  }

  unlike(productId: string) {
    const user = JSON.parse(localStorage.getItem('user')!);
    const userId = user._id;
  }
}
