import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { AppConfig } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  apiBaseURL = AppConfig.settings.apiServer.baseURL;

  constructor(private http: HttpClient) { }

  requestHeaders() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    return httpOptions;
  }

  convertDateFormat(dateToConvert) {
    var converteddate = new Date(dateToConvert),
      month = ("0" + (converteddate.getMonth() + 1)).slice(-2),
      day = ("0" + converteddate.getDate()).slice(-2);
    return [converteddate.getFullYear(), month, day].join("-");
  }
}
