
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { Observable, from } from 'rxjs';
import { APIService } from './api.service';
import { Employee } from '../models/employee.model';
import { LoadingService } from './loading.service';
import { AuthService } from './auth.service';


@Injectable()
export class EmployeeResolverService implements Resolve<Observable<Employee>> {
  constructor(private apiService: APIService, private loadingService: LoadingService, private authService: AuthService) { }
  auth: any
  resolve() {
    this.authService.getAuth().subscribe((data: any) => {
      if (data) if (data.length !== 0) this.auth = data
    })
    this.loadingService.setState(true)
    return from(this.apiService.GetEmployee(this.auth.attributes.email))
  }
}
