import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  auth: any
  constructor(private authService: AuthService) {
  }
  
  async ngOnInit() {
    await this.authService.currentAuthenticatedUser()
    this.authService.getAuth().subscribe((data: any) => {
      this.auth = data
    })
  }
  title = 'serverlesswebexample-front';
}
