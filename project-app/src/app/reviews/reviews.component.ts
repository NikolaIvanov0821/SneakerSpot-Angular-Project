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
  user: User | undefined;
  product: Product | undefined;

  constructor(private api: ApiService, private userService: UserService, private route: ActivatedRoute) {}

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

  postReview() {
    if (!this.form.valid) {
      return;
    }

    const { title, rating, comment } = this.form.value;
    const userId = JSON.parse(localStorage.getItem('user')!)._id;
    this.userService.getProfile(userId).subscribe((data) => this.user = data);
    const username = this.user?.username;
    const productId = this.productId;
    this.api.getProduct(productId).subscribe((data) => this.product = data);
    const productName = this.product?.name

    this.api.postReview(username!, title!, productName!, rating!, comment!).subscribe((data) => console.log(data));
    this.userService.addReview(username!, title!, productId!, rating!, comment!).subscribe((data) => console.log(data));

    this.form.reset();
  }

}
