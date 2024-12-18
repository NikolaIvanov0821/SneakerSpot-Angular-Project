import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { matchPasswordsValidator } from '../../utils/password-match';
import { UserService } from '../user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    email: new FormControl('', [Validators.required]),
    phone: new FormControl(''),
    passGroup: new FormGroup(
      {
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        rePassword: new FormControl('', [Validators.required]),
      },
      {
        validators: [matchPasswordsValidator('password', 'rePassword')],
      }
    ),
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

  get isNotMinLength() {
    return (
      this.form.get('username')?.touched &&
      this.form.get('username')?.errors?.['minlength']
    );
  }
  get passGroup() {
    return this.form.get('passGroup');
  }

  register() {

    if (!this.form.valid) {
      return
    }
    console.log(this.form);


    const {
      username,
      phone,
      email,
      passGroup: { password, rePassword } = {}
    } = this.form.value;

    this.userService.register(username!, phone!, email!, password!, rePassword!).subscribe({
      next: (res) => {
        localStorage.setItem('user', JSON.stringify(res));
        this.isSuccesful = true;
        this.successMessage = 'Register successful!';
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
