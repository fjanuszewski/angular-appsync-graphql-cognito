import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authSubject = new BehaviorSubject([]);
  private auth: any;

  getAuth(): Observable<any> {
    return this.authSubject.asObservable();
  }
  refresh(data) {
    this.auth = data
    this.authSubject.next(this.auth);
  }
  constructor() { }

  signOut = () => {
    return new Promise((resolve, reject) => {
      Auth.signOut()
        .then(() => {
          return resolve(true)
        })
        .catch((err) => {
          reject(console.log(err))
        })
    })
  }

  federatedSignIn = (provider: any = { provider: "Google" }) => {
    return new Promise((resolve, reject) => {
      Auth.federatedSignIn(provider)
        .then((data) => {
          resolve(data)
        })
        .catch((err) => reject(console.log(err)))
    })
  }

  currentAuthenticatedUser(): Promise<boolean> {
    return new Promise((resolve) => {
      Auth.currentAuthenticatedUser({
        bypassCache: false
      })
        .then((user) => {
          if (user) {
            this.refresh(user);
            resolve(true);
          }
        })
        .catch(() => {
          this.refresh(null);
          resolve(false);
        });
    });
  }
}


