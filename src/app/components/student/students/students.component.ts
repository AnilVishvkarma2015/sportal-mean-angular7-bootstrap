import { Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { UtilityService } from '../../../services/utility.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
  users: User[] = [];
  isLoading = true;

  constructor(
    private userService: UserService,
    private toastService: ToastrService,
    private router: Router,
    private utility: UtilityService) { }

  ngAfterViewInit() {
    this.loadUsers();
  }

  private loadUsers() {
    this.userService.getUsers().pipe(
      finalize(() => this.isLoading = false))
      .subscribe(users => {
        users.forEach(element => {
          element.dob = this.utility.convertDateFormat(element.dob);
        });
        this.users = users;
      }, err => {
        this.toastService.error('Data Loading Error: ' + err.status + ' - ' + err.statusText);
        throw err;
      });
  }

  onEnrollNewStudent() {
    this.router.navigate(['enroll-student']);
  }

  onEditStudent(studentSelected: User) {
    this.router.navigate(['enroll-student'], { state: studentSelected });
  }

  onDeleteStudent(studentSelected: User) {
    this.userService.deleteUser(studentSelected).add(() => {
      this.loadUsers();
    });
  }
}
