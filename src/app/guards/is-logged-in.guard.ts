import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionServiceService } from '../services/session-service.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInGuard implements CanActivate {
  constructor(private sessionSrv: SessionServiceService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.sessionSrv.user != null;
  }
  
}
