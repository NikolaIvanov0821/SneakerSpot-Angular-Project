import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { UserService } from '../user/user.service';
import { ActivatedRoute } from '@angular/router';
import { Product, Review } from '../types/product';
import { User } from '../types/user';
import { ReviewsService } from './reviews.service';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl('', [
      Validators.required
    ]),
    rating: new FormControl(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(5)
    ]),
    comment: new FormControl('', [
      Validators.required
    ])
  });

  productId: string = '';
  reviews: Review[] = [];
  user!: User;
  product!: Product;

  constructor(private api: ApiService, private userService: UserService, private route: ActivatedRoute, private reviewsService: ReviewsService) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['productId'];
    // this.reviewsService.getReviews().subscribe((data) => {
    //   data.map((review) => {
    //     if(review.productId === this.productId) {
    //       this.reviews.push(review)
    //     }
    //   } )
    // })

    // Subscribe to the shared reviews observable
    this.reviewsService.reviews$.subscribe((reviews) => {
      this.reviews = reviews.filter(review => review.productId === this.productId);
    });

    // Initial fetch of reviews
    this.reviewsService.getReviews().subscribe();
  }

  get isLoggedIn(): boolean {
    let isLogged = false;
    if (localStorage.getItem('user')) {
      isLogged = true;
    }
    return isLogged;
  }

  async postReview() {
    if (!this.form.valid) {
      return;
    }

    const { title, rating, comment } = this.form.value;
    const userId = JSON.parse(localStorage.getItem('user')!)._id;
    const user = await this.userService.getProfile(userId).toPromise();
    const username = user?.username;
    const productId = this.productId;
    const product = await this.api.getProduct(productId).toPromise();
    const name = product?.name;

    console.log({ username, userId, title, name, productId, rating, comment });
    const review = { username, userId, title, name, productId, rating, comment };

    const productReviewResponse = await this.reviewsService.postReview(review).toPromise();
    console.log(productReviewResponse);

    // this.api.postReview(username!, userId!, title!, productName!, productId!, rating!, comment!).subscribe((data) => console.log(data));
    // this.userService.addReview(username!, userId!, title!, productName!, productId!, rating!, comment!).subscribe((data) => console.log(data));

    this.form.reset();
  }

}
