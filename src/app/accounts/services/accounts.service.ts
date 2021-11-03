import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { UserRegistration } from '../models/user-registration.model';
import { UserAuthentication } from '../models/user-authentication.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserModel } from '../models/user.model';
import { UserData } from '../models/user.data';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private source: string = 'https://assignment-1-backend-denis.herokuapp.com/api';
  private authChangeSub = new Subject<boolean>();
  public authChanged = this.authChangeSub.asObservable();

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  public registerUser(userRegistration: UserRegistration): Observable<any> {
    return this.http.post<UserRegistration>(
      this.source + '/accounts/Registration',
      userRegistration
    );
  }

  public login(userAuthentication: UserAuthentication): Observable<any> {
    return this.http.post<UserAuthentication>(
      this.source + '/accounts/Login',
      userAuthentication
    );
  }

  public getCurrentUser(userName: string|undefined): Observable<any> {
    return this.http.get<UserModel>(
      this.source + '/accounts/GetCurrentUser/' + userName
    );
  }

  public deleteUser(id: string):Observable<any>{
    return this.http.delete<any>(this.source+'/accounts/DeleteUser/'+id);
  }

  public getUsers(): Observable<any>{
    return this.http.get<UserData[]>(
      this.source+'/accounts/GetUsers'
    );
  }

  public saveUser(userModel: UserModel): Observable<any>{
    return this.http.put<UserModel>(this.source+'/accounts/SaveUser', userModel);
  }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this.authChangeSub.next(isAuthenticated);
  };

  public isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');
    return token != null && !this.jwtHelper.isTokenExpired(token);
  };

  public logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    this.sendAuthStateChangeNotification(false);
  };

  public isUserManager(): boolean {
    const token = localStorage.getItem('token');
    const decodedToken = this.jwtHelper.decodeToken(token?.valueOf());
    const role =
      decodedToken[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ];

    return role === 'Manager';
  }

  public isClient(): boolean {
    const token = localStorage.getItem('token');
    const decodedToken = this.jwtHelper.decodeToken(token?.valueOf());
    const role =
      decodedToken[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ];

    return role === 'Client';
  }
}
