import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/environment';
import { Review } from '../types/product';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  url: string = enviroment.apiUrl;
  constructor(private http: HttpClient) { }

  getReviews() {
    const reviews = this.http.get<Review[]>(this.url + '/reviews');
    return reviews;
  }

  postReview(review: object) {
    const reviews = this.http.post<Review>(this.url + '/reviews', review);
    return reviews;
  }

  getReview(reviewId: string) {
    const review = this.http.get<Review>(this.url + '/reviews/' + reviewId);
    return review;
  }

  updateReview(reviewId: string, review: object) {
    const updatedReview = this.http.put<Review>(this.url + '/reviews/' + reviewId, review);
    return updatedReview;
  }

  deleteReview(reviewId: string) {
    const deletedReview = this.http.delete(this.url + '/reviews/' + reviewId);
    return deletedReview;
  }
}
