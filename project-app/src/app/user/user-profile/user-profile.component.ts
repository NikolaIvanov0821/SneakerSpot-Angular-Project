import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../../types/user';
import { Review } from '../../types/product';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  user: User | undefined;
  reviews: Review[] = [];

  constructor(private userService: UserService) {}

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
}
