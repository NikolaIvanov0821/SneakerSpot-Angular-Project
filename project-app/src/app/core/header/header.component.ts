import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../user/user.service';


@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private userService: UserService, private router: Router) {}

  get isLoggedIn(): boolean {
    let isLogged = false
    if (localStorage.getItem("user")) {
      isLogged = true
    }
    return isLogged;
  }

  logout() {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['/home']);
    });
  }
  // isDropdownOpen = false;

  // hover() {
  //   this.isDropdownOpen = !this.isDropdownOpen;
  // }
}
