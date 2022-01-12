import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './accounts/login/login.component';
import { RegisterUserComponent } from './accounts/register-user/register-user.component';
import { AdminGuard } from './accounts/services/admin-guard.service';
import { ClientGuard } from './accounts/services/client-guard.service';
import { AuthGuard } from './accounts/services/guard.service';
import { DeviceDashboardComponent } from './devices/device-dashboard/device-dashboard.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HistoricalConsumptionComponent } from './historical-consumption/historical-consumption.component';
import { MenuComponent } from './menu/menu.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'registration',
    component: RegisterUserComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  { path: 'forbidden', component: ForbiddenComponent },
  {
    path: 'my-profile',
    component: MyProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    component: UserDashboardComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'my-devices',
    component: DeviceDashboardComponent,
    canActivate: [AuthGuard, ClientGuard]
  },
  {
    path:'historical-consumption',
    component: HistoricalConsumptionComponent,
    canActivate:[AuthGuard,ClientGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
