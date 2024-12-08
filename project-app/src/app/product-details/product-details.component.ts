import { Component, OnDestroy, OnInit, providePlatformInitializer } from '@angular/core';
import { Product } from '../types/product';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../user/user.service';
import { ReviewsComponent } from '../reviews/reviews.component';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, ReviewsComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product!: Product;
  productId: string = '';
  isLiked: boolean = false

  productImages: string[] = [];

  selectedImageIndex = 0;
  selectedSize = '';

  constructor(private api: ApiService, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['productId']

    this.api.getProduct(id).subscribe((data) => {
      this.product = data;
      this.productId = this.product._id;
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
    });

    this.isLikedFunction()
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

  get isLoggedIn(): boolean {
    let isLogged = false;
    if (localStorage.getItem('user')) {
      isLogged = true;
    }
    return isLogged;
  }

  isLikedFunction(): boolean {
    let isLiked = false

    const user = JSON.parse(localStorage.getItem('user')!);
    const userId = user._id;

    this.userService.getLiked(userId).subscribe({
      next: (data: any) => {
        this.isLiked = data.includes(this.productId);
      }
    });

    return isLiked
  }

  like() {
    this.api.getLikes(this.productId).subscribe((data) => console.log(data))

    const user = JSON.parse(localStorage.getItem('user')!);
    const userId = user._id;

    this.api.likeProduct(this.productId, userId).subscribe((updatedLikes) => {
      console.log(updatedLikes);
    })
    this.userService.likeProduct(userId, this.productId).subscribe((liked) => console.log(liked));
    this.isLiked = true
  }

  unlike() {
    const user = JSON.parse(localStorage.getItem('user')!);
    const userId = user._id;

    this.api.unlikeProduct(this.productId, userId).subscribe((data) => console.log(data));
    this.isLiked = false
  }

  postReview() {
    
  }

  ngOnDestroy(): void {
    this.productImages = []
  }
}
