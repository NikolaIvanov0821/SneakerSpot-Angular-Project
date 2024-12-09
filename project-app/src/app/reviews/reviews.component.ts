import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { UserService } from '../user/user.service';
import { ActivatedRoute } from '@angular/router';
import { Product, Review } from '../types/product';
import { User } from '../types/user';

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

  constructor(private api: ApiService, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['productId'];
    this.api.getReviews(this.productId).subscribe((data) => {
      this.reviews = data;
    })
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
    const productName = product?.name;

    console.log({ username, userId, title, productName, productId, rating, comment });
    const review = { username, userId, title, productName, productId, rating, comment };

    const productReviewResponse = await this.api.postReview(productId, review).toPromise();
    console.log(productReviewResponse);
    const userReviewResponse = await this.userService.addReview(userId, review).toPromise();
    console.log(userReviewResponse);
    
    // this.api.postReview(username!, userId!, title!, productName!, productId!, rating!, comment!).subscribe((data) => console.log(data));
    // this.userService.addReview(username!, userId!, title!, productName!, productId!, rating!, comment!).subscribe((data) => console.log(data));

    this.form.reset();
  }

}
