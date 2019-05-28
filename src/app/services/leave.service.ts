import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';

import { Leave } from '../models/leave.model';
import { ToastrService } from 'ngx-toastr';
import { UtilityService } from './utility.service';
import { AppConfig } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  apiBaseURL = AppConfig.settings.apiServer.baseURL;

  constructor(private http: HttpClient, private utility: UtilityService, private router: Router, private toastService: ToastrService) { }

  create(newLeave: Leave) {
    return this.http.post<Leave>(this.apiBaseURL + 'leaves/create', newLeave, this.utility.requestHeaders())
      .subscribe(res => {
        this.toastService.success('Leave Applied Successfully');
        this.router.navigate(['leaves']);
        return res;
      }, error => {
        this.toastService.error('Leave does not applied');
        throw error;
      });
  }

  getLeaves() {
    return this.http.get<Leave[]>(this.apiBaseURL + 'leaves/').pipe(map(res => {
      return res;
    }));
  }

  getLeaveById(leaveId): any {
    return this.http.get(this.apiBaseURL + 'leaves/' + leaveId).pipe(map(res => {
      return res;
    }));
  };

  getLeaveByRegNo(regNo): any {
    return this.http.get(this.apiBaseURL + 'leaves/getByRegNo/' + regNo).pipe(map(res => {
      return res;
    }));
  };

  updateLeave(updatedLeave: Leave) {
    return this.http.put(this.apiBaseURL + 'leaves/' + updatedLeave.id, updatedLeave)
      .subscribe(res => {
        this.toastService.success('Leave Updated Successfully');
        return res;
      }, error => {
        this.toastService.error(JSON.stringify(error.error.message));
        throw error;
      });
  };

  deleteLeave(deletedLeave: Leave) {
    return this.http.delete(this.apiBaseURL + 'leaves/' + deletedLeave.id)
      .subscribe(res => {
        this.toastService.success('Leave Deleted Successfully');
        return res;
      }, error => {
        this.toastService.error(JSON.stringify(error.error.message));
        throw error;
      });
  };
}
