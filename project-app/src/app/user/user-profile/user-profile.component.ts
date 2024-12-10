import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../../types/user';
import { Review } from '../../types/product';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api.service';
import { ReviewsService } from '../../reviews/reviews.service';

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
  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    rating: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(5)]),
    comment: new FormControl('', [Validators.required])
  });

  editTriggered: boolean = false;
  deleteTriggered: boolean = false;
  reviewToEdit: Review | null = null; 
  reviewToDelete: string | null = null; 


  constructor(private userService: UserService, private api: ApiService, private reviewsService: ReviewsService) { }

  ngOnInit(): void {
    const userId = JSON.parse(localStorage.getItem('user')!)._id;
    this.userService.getProfile(userId).subscribe((data) => {
      this.user = data;
    });

    this.reviewsService.getReviews().subscribe((data) => {
      data.map(review => {
        if (review.userId === userId) {
          this.reviews.push(review)
        }
      })
    })
  }

  get isLoggedIn(): boolean {
    let isLogged = false;
    if (localStorage.getItem("user")) {
      isLogged = true;
    }
    return isLogged;
  }

  isFieldTextMissing(controlName: string) {
    return (
      this.form.get(controlName)?.touched &&
      this.form.get(controlName)?.errors?.['required']
    );
  }

  triggerEdit(review: Review) {
    this.editTriggered = true;

    this.reviewToEdit = review;

    // Populate form with current review values
    this.form.patchValue({
      title: review.title,
      rating: review.rating,
      comment: review.comment
    });
  }

  cancelEdit() {
    this.editTriggered = false;
    this.reviewToEdit = null;
    this.form.reset();
  }

  async editReview() {
    if (!this.form.valid || !this.reviewToEdit) return;

    const updatedReview = {
      ...this.reviewToEdit,
      ...this.form.value
    };

    const result = await this.reviewsService.updateReview(updatedReview._id, updatedReview).toPromise();
    console.log(result);

    this.cancelEdit();
  }

  triggerDelete(reviewId: string) {
    this.deleteTriggered = true;
    this.reviewToDelete = reviewId;
  }

  cancelDelete() {
    this.deleteTriggered = false;
    this.reviewToDelete = null;
  }

  deleteReview() {
    if (!this.reviewToDelete) return;

    
  }
}
