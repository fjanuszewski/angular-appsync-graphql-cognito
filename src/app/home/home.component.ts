import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
 
  constructor(private authService:AuthService, private loadingService:LoadingService) {

  }

  ngOnInit(): void {
  }
  getAuth():Observable<any[]> {
    return this.authService.getAuth()
  }

  ngAfterViewInit(): void {
    this.loadingService.setState(false)
  }
  spinnerStatus(data){
    this.loadingService.setState(data)
  }
}