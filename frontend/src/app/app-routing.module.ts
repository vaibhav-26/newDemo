import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './components/layout/app-layout/app-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { SeatingArrangementComponent } from './pages/seating-arrangement/seating-arrangement.component';
import { UserComponent } from './pages/user/user.component';
import { MFAComponent } from './pages/mfa/mfa.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Role } from './core/models/user/role';
import { AuthGuard } from './core/guard/auth.guard';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ProjectComponent } from './pages/project/project.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'desks',
        component: SeatingArrangementComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [Role.Admin, Role.Manager, Role.Engineer],
        },
      },
      {
        path: 'users',
        component: UserComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [Role.Admin, Role.Manager],
        },
      },
      {
        path: 'requests',
        component: RequestsComponent,
      },
      {
        path: 'seatingArrangement',
        component: SeatingArrangementComponent,
        pathMatch: 'full',
      },
      {
        path: 'projects',
        canActivate: [AuthGuard],
        component: ProjectComponent,
      },
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        component: DashboardComponent,
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'mfa',
    children: [
      { path: 'forgetpassword', component: MFAComponent },
      { path: 'login', component: MFAComponent },
    ],
  },
  {
    path: 'forgotpassword',
    component: ForgotPasswordComponent,
  },
  {
    path: 'resetpassword',
    component: ResetPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
