import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {
  auth: any
  constructor(private authService: AuthService) {
  }
  
  async ngOnInit() {
    this.authService.getAuth().subscribe((data: any) => {
      if(data) if(data.length !== 0) this.auth = data
    })
  }
  logout() {
    this.authService.signOut()
  }
  login() {
    this.authService.federatedSignIn()
  }

}
