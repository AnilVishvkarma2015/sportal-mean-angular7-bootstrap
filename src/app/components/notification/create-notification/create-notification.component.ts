import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-create-notification',
  templateUrl: './create-notification.component.html',
  styleUrls: ['./create-notification.component.css']
})
export class CreateNotificationComponent {

  form: FormGroup;
  categories: string[] = ['Holiday', 'Examination', 'Circular', 'Faculty Change'];

  constructor(private formBuilder: FormBuilder, private noticeService: NotificationService) {
    this.form = this.formBuilder.group({
      id: [''],
      category: ['', Validators.required],
      notice: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    return (this.form.controls[field].invalid && (this.form.controls[field].dirty || this.form.controls[field].touched));
  }

  onSubmit() {
    this.noticeService.create(this.form.value);
  }
}
