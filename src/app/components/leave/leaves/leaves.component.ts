import { Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { Leave } from '../../../models/leave.model';
import { LeaveService } from '../../../services/leave.service';
import { UtilityService } from '../../../services/utility.service';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css']
})
export class LeavesComponent {
  leaves: Leave[] = [];
  isLoading = true;
  isAdmin: Observable<boolean>;
  regNo: string;

  constructor(
    private leaveService: LeaveService,
    private toastService: ToastrService,
    private router: Router,
    private utility: UtilityService) {

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.regNo = currentUser.regNo;
    this.isAdmin = currentUser.isAdmin;
  }

  ngAfterViewInit() {
    if (this.isAdmin) {
      this.loadLeaves();
    } else {
      this.loadMyLeaves(this.regNo);
    }
  }

  private loadLeaves() {
    this.leaveService.getLeaves().pipe(
      finalize(() => this.isLoading = false))
      .subscribe(leaves => {
        leaves.forEach(element => {
          element.startDate = this.utility.convertDateFormat(element.startDate);
          element.endDate = this.utility.convertDateFormat(element.endDate);
        });
        this.leaves = leaves;
      }, err => {
        this.toastService.error('Data Loading Error: ' + err.status + ' - ' + err.statusText);
        throw err;
      });
  }

  private loadMyLeaves(regNo) {
    this.leaveService.getLeaveByRegNo(regNo).pipe(
      finalize(() => this.isLoading = false))
      .subscribe(leaves => {
        leaves.forEach(element => {
          element.startDate = this.utility.convertDateFormat(element.startDate);
          element.endDate = this.utility.convertDateFormat(element.endDate);
        });
        this.leaves = leaves;
      }, err => {
        this.toastService.error('Data Loading Error: ' + err.status + ' - ' + err.statusText);
        throw err;
      });
  }

  onApplyLeave() {
    this.router.navigate(['apply-leave']);
  }

  onEditLeave(leaveSelected: Leave) {
    this.router.navigate(['apply-leave'], { state: leaveSelected });
  }

  onDeleteLeave(leaveSelected: Leave) {
    this.leaveService.deleteLeave(leaveSelected).add(() => {
      this.ngAfterViewInit();
    });
  }
}
