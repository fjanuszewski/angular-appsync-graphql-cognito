import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';
import { EmployeeResolverService } from './services/employee-resolver.service';



const routes: Routes = [
  {
    path: 'profile',
    canActivate: [AuthGuard],
    resolve: {EmployeeResolverService },
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "auth",
    component: AuthComponent
  },
  {
    path: "logout",
    component: LogoutComponent
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path:'',component:HomeComponent
  },
  {
    path: "home",
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
