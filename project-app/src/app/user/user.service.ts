import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { UserForAuth } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<UserForAuth | null>(null);
  private user$ = this.user$$.asObservable();


  user: UserForAuth | null = null;
  userSubscription: Subscription | null = null;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  login(email: string, password: string) {
    return this.http
      .post<UserForAuth>(enviroment.apiUrl + '/users/login', { email, password })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  register(
    username: string,
    phone: string,
    email: string,
    password: string,
    rePassword: string
  ) {
    return this.http
      .post<UserForAuth>(enviroment.apiUrl + '/users/register', {
        username,
        phone,
        email,
        password,
        rePassword,
      })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  logout() {
    return this.http
      .post(enviroment.apiUrl + '/users/logout', {})
      .pipe(tap((user) => {
        this.user$$.next(null);
        localStorage.removeItem('user')
      }));
  }

  getProfile() {
    return this.http
      .get<UserForAuth>('/users/register')
      .pipe(tap((user) => this.user$$.next(user)));
  }

  // updateProfile(username: string, email: string, tel?: string) {
  //   return this.http
  //     .put<UserForAuth>(`/users/register/${userId}}`, {
  //       username,
  //       email,
  //       tel,
  //     })
  //     .pipe(tap((user) => this.user$$.next(user)));
  // }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}