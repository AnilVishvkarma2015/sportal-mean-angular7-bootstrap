import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AppBootstrapModule } from './bootstrap.module';
import { AppConfig } from './config/app.config';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { CreatePasswordComponent } from './components/user/create-password/create-password.component';
import { ResetPasswordComponent } from './components/user/reset-password/reset-password.component';
import { NotificationsComponent } from './components/notification/notifications/notifications.component';
import { AuthGuard } from './core/auth.guard';
import { AuthenticationService } from './services/authentication.service';
import { GlobalErrorHandlerService } from './services/global-error-handler.service';
import { JwtInterceptor } from './core/jwt.interceptor';
import { CreateNotificationComponent } from './components/notification/create-notification/create-notification.component';
import { StudentsComponent } from './components/student/students/students.component';
import { EnrollStudentsComponent } from './components/student/enroll-students/enroll-students.component';
import { LeavesComponent } from './components/leave/leaves/leaves.component';
import { ApplyLeaveComponent } from './components/leave/apply-leave/apply-leave.component';
import { SettingsComponent } from './components/setting/settings/settings.component';

export function initConfig(config: AppConfig) {
  return () => config.load();
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    CreatePasswordComponent,
    ResetPasswordComponent,
    NotificationsComponent,
    CreateNotificationComponent,
    StudentsComponent,
    EnrollStudentsComponent,
    LeavesComponent,
    ApplyLeaveComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppBootstrapModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [AppConfig],
      multi: true
    },
    GlobalErrorHandlerService,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
