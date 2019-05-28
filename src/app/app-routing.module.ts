import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { CreatePasswordComponent } from './components/user/create-password/create-password.component';
import { ResetPasswordComponent } from './components/user/reset-password/reset-password.component';
import { AuthGuard } from './core/auth.guard';
import { NotificationsComponent } from './components/notification/notifications/notifications.component';
import { CreateNotificationComponent } from './components/notification/create-notification/create-notification.component';
import { StudentsComponent } from './components/student/students/students.component';
import { EnrollStudentsComponent } from './components/student/enroll-students/enroll-students.component';
import { SettingsComponent } from './components/setting/settings/settings.component';
import { LeavesComponent } from './components/leave/leaves/leaves.component';
import { ApplyLeaveComponent } from './components/leave/apply-leave/apply-leave.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'create-password',
    component: CreatePasswordComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'notifications',
    canActivate: [AuthGuard],
    component: NotificationsComponent
  },
  {
    path: 'create-notification',
    canActivate: [AuthGuard],
    component: CreateNotificationComponent
  },
  {
    path: 'students',
    canActivate: [AuthGuard],
    component: StudentsComponent
  },
  {
    path: 'enroll-student',
    canActivate: [AuthGuard],
    component: EnrollStudentsComponent
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
    component: SettingsComponent
  },
  {
    path: 'leaves',
    canActivate: [AuthGuard],
    component: LeavesComponent
  },
  {
    path: 'apply-leave',
    canActivate: [AuthGuard],
    component: ApplyLeaveComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
