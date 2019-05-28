import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, Params } from '@angular/router';
import { Observable, of as observableOf } from 'rxjs';
import * as _ from 'underscore';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.css']
})
export class CreatePasswordComponent {
  form: FormGroup;
  user: Params;
  isNewForm: Observable<boolean>;

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder, private toastService: ToastrService) {

    this.user = this.router.getCurrentNavigation().extras.queryParams;
    this.isNewForm = observableOf(true);
    this.form = this.formBuilder.group({
      id: [this.user.id],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]],
      confirmPassword: ['', [
        Validators.required,
        Validators.minLength(8)
      ]]
    });
  }

  isFieldInvalid(field: string) {
    return (this.form.controls[field].invalid && (this.form.controls[field].dirty || this.form.controls[field].touched));
  }

  onSubmit() {
    if (this.form.value.password !== this.form.value.confirmPassword) {
      this.toastService.error("Password entered do not match!");
      return;
    }

    this.userService.updateUser(this.form.value);
    this.isNewForm = observableOf(false);
  }
}
