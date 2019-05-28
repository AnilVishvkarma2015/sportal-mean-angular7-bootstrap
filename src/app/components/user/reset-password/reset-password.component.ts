import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'underscore';
import { ToastrService } from 'ngx-toastr';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  form: FormGroup;

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder, private toastService: ToastrService) {
    this.form = this.formBuilder.group({
      regNo: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
      ]]
    });
  }

  isFieldInvalid(field: string) {
    return (this.form.controls[field].invalid && (this.form.controls[field].dirty || this.form.controls[field].touched));
  }

  onSubmit() {
    this.userService.register(this.form.value)
      .subscribe(users => {
        if (_.isArray(users) && _.isEmpty(users)) {
          this.toastService.error('Registration number does not exist.');
          return;
        }

        let user = users[0];

        if (user.email !== this.form.value.email) {
          this.toastService.error('Email is not registered.');
          return;
        }

        this.router.navigate(['create-password'], { queryParams: { id: user._id } });
      }, err => {
        this.toastService.error('Data Loading Error: ' + err.status + ' - ' + err.statusText);
        throw err;
      });
  }
}
