import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/environment';
import { Review } from '../types/product';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private reviewsSubject = new BehaviorSubject<Review[]>([]);
  reviews$ = this.reviewsSubject.asObservable();
  url: string = enviroment.apiUrl;
  constructor(private http: HttpClient) { }

  getReviews() {
    const reviews = this.http.get<Review[]>(this.url + '/reviews').pipe(
      tap(reviews => this.reviewsSubject.next(reviews))
    );
    return reviews;
  }

  postReview(review: object) {
    const reviews = this.http.post<Review>(this.url + '/reviews', review).pipe(
      tap(() => this.refreshReviews())
    );
    return reviews;
  }

  getReview(reviewId: string) {
    const review = this.http.get<Review>(this.url + '/reviews/' + reviewId);
    return review;
  }

  updateReview(reviewId: string, review: object) {
    const updatedReview = this.http.put<Review>(this.url + '/reviews/' + reviewId, review).pipe(
      tap(() => this.refreshReviews())
    );
    return updatedReview;
  }

  deleteReview(reviewId: string) {
    const deletedReview = this.http.delete(this.url + '/reviews/' + reviewId).pipe(
      tap(() => this.refreshReviews())
    );
    return deletedReview;
  }

  private refreshReviews() {
    this.getReviews().subscribe();
  }
}
