import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../api.service';
import { EmailDirective } from '../../directives/email.directive';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, EmailDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private api: ApiService) {}

  submitUser(form: NgForm) {
    if (form.invalid) {
      console.error('Invalid Login Form!');
      return;
    }
    
  }
}
