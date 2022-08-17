import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SwalService } from './swal.service';

@Injectable({
  providedIn: 'root'
})

//Checks if the token exists or not to give authorization in the file of app-routing.module
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,private swal:SwalService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var token = localStorage.getItem('token');
    if (!token) {
      this.swal.messageToUser("To connect to the site you must connect with a username and password")
      this.router.navigate(['/login']);
    }
    return true;
  }

}
