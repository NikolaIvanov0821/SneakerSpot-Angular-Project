import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { UserService } from '../user/user.service';
import { ActivatedRoute } from '@angular/router';
import { Review } from '../types/product';

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
    const user = JSON.parse(localStorage.getItem('user')!);
    const userId = user._id;
    const productId = this.productId;

    this.api.postReview(userId!, title!, productId!, rating!, comment!).subscribe((data) => console.log(data));
    this.userService.addReview(userId!, title!, productId!, rating!, comment!).subscribe((data) => console.log(data));

    this.form.reset();
  }

}
