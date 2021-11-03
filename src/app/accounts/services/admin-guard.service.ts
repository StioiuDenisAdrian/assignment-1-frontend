import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AccountService } from "./accounts.service";

@Injectable({
    providedIn: 'root'
  })
export class AdminGuard implements CanActivate{

    constructor(private readonly authenticationService: AccountService,
                private readonly router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
       if(this.authenticationService.isUserManager()){
           return true;
       }
       this.router.navigateByUrl('/forbidden');
       return false;
    }
    
}