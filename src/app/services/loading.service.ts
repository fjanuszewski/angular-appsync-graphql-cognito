import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {


  private stateSubject = new BehaviorSubject([]);
  private state: any;

  constructor() {
    this.setState(false)
   }
  
  getState(): Observable<any> {
    return this.stateSubject.asObservable();
  }
  setState(data) {
    this.state = data
    this.stateSubject.next(this.state);
  }
}
