import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "./auth.service";
import { ToastrService } from "ngx-toastr";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate{

    constructor(private authService: AuthService, private router: Router, private toastr: ToastrService){
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
        console.log("isloggedIn ===> ", this.authService.isloggedIn);
            if (this.authService.isloggedIn) {
                return true;
            } else {
                this.router.navigate(['/auth/login']);
                return false;
            }

    }
}