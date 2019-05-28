import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '../../../services/user.service';
import { UtilityService } from '../../../services/utility.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  cities: string[] = ['London', 'Newyork', 'Berlin', 'Rome', 'Peris', 'Delhi', 'Mosco'];
  filtersLoaded: Promise<boolean>;
  isLoading = true;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private toastService: ToastrService,
    private utility: UtilityService) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.loadUser(currentUser._id);
  }

  loadUser(userId) {
    this.userService.getUserById(userId).subscribe(currentUser => {
      if (currentUser !== null && currentUser !== undefined) {
        this.createUserForm(currentUser);
        this.filtersLoaded = Promise.resolve(true);
        this.isLoading = false;
      }
    });
  }

  createUserForm(currentUser) {
    this.form = this.formBuilder.group({
      id: [currentUser.id],
      firstName: [currentUser.firstName, Validators.required],
      lastName: [currentUser.lastName, Validators.required],
      dob: [{ value: this.utility.convertDateFormat(currentUser.dob), disabled: false }],
      regNo: [{ value: currentUser.regNo, disabled: true }],
      email: [{ value: currentUser.email, disabled: true }],
      class: [{ value: currentUser.class, disabled: true }],
      section: [{ value: currentUser.section, disabled: true }],
      phone: [currentUser.phone, Validators.required],
      city: [currentUser.city, Validators.required],
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

  changePassword() {
    if (this.form.value.password !== this.form.value.confirmPassword) {
      this.toastService.error("Password entered do not match!");
      return;
    }

    this.userService.updateUser(this.form.value).add(() => {
      const userId = this.form.value.id;
      this.loadUser(userId);
    });
  }

  onSubmit() {
    let detailsToUpdate = {
      id: this.form.value.id,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      dob: this.form.value.dob,
      phone: this.form.value.phone,
      city: this.form.value.city,
    }

    this.userService.updateUser(detailsToUpdate).add(() => {
      const userId = this.form.value.id;
      this.loadUser(userId);
    });
  }
}
