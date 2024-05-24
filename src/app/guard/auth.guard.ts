import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, NavigationExtras, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.authService.isLoggedIn()) {
        // Capture the attempted URL
        const attemptedUrl = state.url;

        // Redirect to the login page with the attempted URL as a query parameter
        this.router.navigateByUrl('/login-signup', { queryParams: { returnUrl: attemptedUrl } } as NavigationExtras);
        return false;
      }
      return true;
  }
}
