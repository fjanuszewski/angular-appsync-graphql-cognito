
import {
  Component,
  OnInit
} from '@angular/core';
import {
  AmplifyService
} from 'aws-amplify-angular';
import {
  Router
} from '@angular/router';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {

  constructor(public amplifyService: AmplifyService, public router: Router, private loadingService:LoadingService) {
    this.loadingService.setState(true)
    this.amplifyService = amplifyService;
    this.amplifyService.authStateChange$
      .subscribe(authState => {
        if (authState.state === 'signedIn') {
          this.router.navigate(['/']);
        }
      });
  }

  ngOnInit() {}

}