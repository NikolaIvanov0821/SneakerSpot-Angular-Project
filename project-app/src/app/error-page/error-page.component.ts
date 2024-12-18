import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  imports: [],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.css'
})
export class ErrorPageComponent {
  errorCode: number = 404;
  errorMessage: string = 'Page Not Found';

  constructor(private router: Router) {}

  navigateHome(): void {
    this.router.navigate(['/']);
  }
}
