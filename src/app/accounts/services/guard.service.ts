import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AccountService } from "./accounts.service";

@Injectable({
    providedIn: 'root'
  })

export class AuthGuard implements CanActivate{

   
    constructor(private readonly authenticationService: AccountService,
                private readonly router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
        if(this.authenticationService.isUserAuthenticated()){
            return true;
        }
        this.router.navigateByUrl("/login");
        return false;
    }


    
}