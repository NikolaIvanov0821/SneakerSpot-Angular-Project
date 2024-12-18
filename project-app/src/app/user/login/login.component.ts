import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ])
  });
  isError: boolean = false;
  isSuccesful: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private userService: UserService, private router: Router) { }

  isFieldTextMissing(controlName: string) {
    return (
      this.form.get(controlName)?.touched &&
      this.form.get(controlName)?.errors?.['required']
    );
  }

  login() {
    if (!this.form.valid) {
      return;
    }

    const { email, password } = this.form.value;

    this.userService.login(email!, password!).subscribe({
      next: (res) => {
        localStorage.setItem('user', JSON.stringify(res));
        this.isSuccesful = true;
        this.successMessage = 'Login successful!';
        this.clearMessagesAfterDelay();
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.isError = true;
        this.errorMessage = err.error.message || 'An unexpected error occurred';
        this.clearMessagesAfterDelay();
      }
    });
  }

  clearMessagesAfterDelay() {
    setTimeout(() => {
      this.isError = false;
      this.errorMessage = '';
      this.successMessage = '';
    }, 20000); 
  }
}
