import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeeSubject = new BehaviorSubject([]);
  private employee: any
  getObsEmployee(): Observable<any> {
    return this.employeeSubject.asObservable();
  }
  private refresh(employee) {
    this.employee = employee
    this.employeeSubject.next(this.employee);
  }
  constructor(private http: HttpClient) { }

  getEmployee(employee) {
    return this.http.get('../../assets/employee.json');
  }
  
}
