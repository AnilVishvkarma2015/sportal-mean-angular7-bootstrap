import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';

import { Notification } from '../models/notification.model';
import { ToastrService } from 'ngx-toastr';
import { UtilityService } from './utility.service';
import { AppConfig } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  apiBaseURL = AppConfig.settings.apiServer.baseURL;

  constructor(private http: HttpClient, private utility: UtilityService, private router: Router, private toastService: ToastrService) { }

  create(newNotice: Notification) {
    return this.http.post<Notification>(this.apiBaseURL + 'notifications/create', newNotice, this.utility.requestHeaders())
      .subscribe(res => {
        this.toastService.success('Notice Posted Successfully');
        this.router.navigate(['notifications']);
        return res;
      }, error => {
        this.toastService.success('Notice does not posted posted');
        throw error;
      });
  }

  getNotifications() {
    return this.http.get<Notification[]>(this.apiBaseURL + 'notifications/').pipe(map(res => {
      return res;
    }));
  }

  getNotificationById(noticeId): any {
    return this.http.get(this.apiBaseURL + 'notifications/' + noticeId).pipe(map(res => {
      return res;
    }));
  };

  updateNotification(updatedNotice: Notification) {
    return this.http.put(this.apiBaseURL + 'notifications/' + updatedNotice.id, updatedNotice)
      .subscribe(res => {
        this.toastService.success('Notice Updated Successfully');
        return res;
      }, error => {
        this.toastService.error(JSON.stringify(error.error.message));
        throw error;
      });
  };

  deleteNotification(deletedNotice: Notification) {
    return this.http.delete(this.apiBaseURL + 'notifications/' + deletedNotice.id)
      .subscribe(res => {
        this.toastService.success('Notice Deleted Successfully');
        return res;
      }, error => {
        this.toastService.error(JSON.stringify(error.error.message));
        throw error;
      });
  };
}
