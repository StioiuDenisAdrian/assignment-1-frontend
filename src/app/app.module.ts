import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterUserComponent } from './accounts/register-user/register-user.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { LoginComponent } from './accounts/login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { JwtModule } from "@auth0/angular-jwt";
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { MenuComponent } from './menu/menu.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DeviceDashboardComponent } from './devices/device-dashboard/device-dashboard.component';
import { EditDeviceComponent } from './devices/edit-device/edit-device.component';
import { SeeMeasurementComponent } from './see-measurement/see-measurement.component';
import { ChartsModule } from 'ng2-charts';
import { TokenInterceptor } from './accounts/services/http-interceptor.service';
import { NotificationComponent } from './notification/notification/notification.component';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [AppComponent, RegisterUserComponent, LoginComponent, ForbiddenComponent, MenuComponent, MyProfileComponent, UserDashboardComponent, EditUserComponent, DeviceDashboardComponent, EditDeviceComponent, SeeMeasurementComponent, NotificationComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatProgressBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    ChartsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["https://assignment-1-frontend.herokuapp.com/", "https://assignment-1-backend-denis.herokuapp.com/"],
        disallowedRoutes:[]
      }
    })
  ],
  
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass:  TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
