import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;

  constructor(private authService: AuthenticationService, private toastService: ToastrService, private router: Router, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      regNo: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]]
    });
  }

  isFieldInvalid(field: string) {
    return (this.form.controls[field].invalid && (this.form.controls[field].dirty || this.form.controls[field].touched));
  }

  onSubmit() {
    this.authService.login(this.form.value.regNo, this.form.value.password)
      .pipe(first())
      .subscribe(
        loginRes => {
          if (loginRes && loginRes.message) {
            this.toastService.error(loginRes.message);
            return;
          }
          this.router.navigate(['notifications']);
        },
        err => {
          this.toastService.error("Invalid Credentials");
        });
  }

  forgotPassword() {
    this.router.navigate(['reset-password']);
  }
}
