import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {


  get isLoggedIn(): boolean {
    let isLogged = false;
    if (localStorage.getItem("user")) {
      isLogged = true;
    }
    return isLogged;
  }
}
