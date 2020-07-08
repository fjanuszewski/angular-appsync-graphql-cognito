import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth/auth.component';

import { AuthGuard } from './auth.guard';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';

import { LoadingComponent } from './loading/loading.component';
import { HttpInterceptorInterceptor } from './http-interceptor.interceptor';
import { ProfileModule } from './profile/profile.module';
import { EmployeeResolverService } from './services/employee-resolver.service';

@NgModule({
  declarations: [
    AppComponent,
    LogoutComponent,
    LoginComponent,
    AuthComponent,
    NavComponent,
    HomeComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule, 
    NgbModule, 
    AmplifyAngularModule,
    ProfileModule
  ],
  providers: [AmplifyService, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorInterceptor,
    multi: true,
  }, EmployeeResolverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
