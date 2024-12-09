import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../../types/user';
import { Review } from '../../types/product';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  user: User | undefined;
  reviews: Review[] = [];
  isDeleteConfirmationVisible: boolean = false;
  reviewToDelete!: Review;

  constructor(private userService: UserService, private api: ApiService) { }

  ngOnInit(): void {
    const userId = JSON.parse(localStorage.getItem('user')!)._id;
    this.userService.getProfile(userId).subscribe((data) => {
      this.user = data;
      this.reviews = this.user.reviews;
    });
  }

  get isLoggedIn(): boolean {
    let isLogged = false;
    if (localStorage.getItem("user")) {
      isLogged = true;
    }
    return isLogged;
  }

  showDeleteConfirmation(review: Review): void {
    // Show the confirmation modal
    this.isDeleteConfirmationVisible = true;
    this.reviewToDelete = review;
  }

  cancelDelete(): void {
    // Hide the confirmation modal
    this.isDeleteConfirmationVisible = false;
    this.reviewToDelete;
  }

  async deleteReview(review: Review){
    const productId = review.productId;
    const deletedFromProducts = await this.api.deleteReview(productId, review).toPromise();
    console.log(deletedFromProducts);
    
    const userId = JSON.parse(localStorage.getItem('user')!)._id;
    const deletedFormUser = await this.userService.deleteReview(userId, review).toPromise();
    console.log(deletedFormUser);
  }

}
