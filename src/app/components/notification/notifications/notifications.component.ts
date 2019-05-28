import { Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Notification } from '../../../models/notification.model';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {
  notices: Notification[] = [];
  isLoading = true;
  isAdmin: Observable<boolean>;

  constructor(
    private noticeService: NotificationService,
    private router: Router,
    private toastService: ToastrService) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.isAdmin = currentUser.isAdmin;
  }

  ngAfterViewInit() {
    this.loadNotifications();
  }

  private loadNotifications() {
    this.noticeService.getNotifications().pipe(
      finalize(() => this.isLoading = false))
      .subscribe(notices => {
        this.notices = notices;
      }, err => {
        this.toastService.error('Data Loading Error: ' + err.status + ' - ' + err.statusText);
        throw err;
      });
  }

  onNewNotice() {
    this.router.navigate(['create-notification']);
  }
}
