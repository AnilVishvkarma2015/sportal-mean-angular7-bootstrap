import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';

import { User } from '../models/user.model';
import { Register } from '../models/register.model';
import { ToastrService } from 'ngx-toastr';
import { UtilityService } from './utility.service';
import { AppConfig } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiBaseURL = AppConfig.settings.apiServer.baseURL;

  constructor(private http: HttpClient, private utility: UtilityService, private router: Router, private toastService: ToastrService) { }

  register(newRegistration: Register) {
    return this.http.post<Register>(this.apiBaseURL + 'users/getByRegNo', newRegistration, this.utility.requestHeaders())
      .pipe(map(res => {
        return res;
      }));
  }

  enrollUser(newUser: User) {
    return this.http.post(this.apiBaseURL + 'users/register', newUser, this.utility.requestHeaders())
      .subscribe(res => {
        this.toastService.success('Student Enrolled Successfully');
        return res;
      }, error => {
        this.toastService.error('Registration No/Email already registered');
        throw error;
      });
  }

  getUsers() {
    return this.http.get<User[]>(this.apiBaseURL + 'users/').pipe(map(res => {
      return res;
    }));
  }

  getUserById(userId): any {
    return this.http.get(this.apiBaseURL + 'users/' + userId).pipe(map(res => {
      return res;
    }));
  };

  updateUser(updatedUser: any) {
    return this.http.put(this.apiBaseURL + 'users/' + updatedUser.id, updatedUser)
      .subscribe(res => {
        this.toastService.success('User Updated Successfully');
        return res;
      }, error => {
        this.toastService.error(JSON.stringify(error.error.message));
        throw error;
      });
  };

  deleteUser(deleteUser: User) {
    return this.http.delete(this.apiBaseURL + 'users/' + deleteUser.id)
      .subscribe(res => {
        this.toastService.success('User Deleted Successfully');
        return res;
      }, error => {
        this.toastService.error(JSON.stringify(error.error.message));
        throw error;
      });
  };
}
