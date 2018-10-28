import { Injectable } from '@angular/core';
import { Config } from '../config';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthGuard {

  public config : Config;

    constructor(private nav : Router, public jwtHelper: JwtHelperService) 
    { 
        this.config = new Config();
    }

    /**
     * Function called when navigating to main page, checks if user is authenticated
     * 
     * @returns boolean
     * 
     * @memberof AuthGuard
     */
    /*canActivate()
    {
        let token = localStorage.getItem(Config.TOKEN_KEY);
        if(token !== null)
        {
            
            return true;
        }
        else
        {
            this.nav.navigate(['/login']);
            return false;
        }
    }*/
    canActivate()
    {
        let token = localStorage.getItem(Config.TOKEN_KEY);
        console.log("tokeeen: "+token);
        if(token !== null)
        {
            if(this.isTokenExpired()){
                console.log("TOKEN EXPIRED")
                this.nav.navigate(['/login']);
                return false;
            }
            
            return true;
        }
        else
        {
            this.nav.navigate(['/login']);
            return false;
        }
    }

    isTokenExpired(){

        //console.log("tOKEN EXPIRED: "+this.jwtHelper.isTokenExpired());
        return this.jwtHelper.isTokenExpired();
    }

    loggedIn(){
        return !this.isTokenExpired();
    }

    getCurrentUser(){

        let token = localStorage.getItem(Config.TOKEN_KEY);
        let decoded = this.jwtHelper.decodeToken(token);
    
        let username = decoded.username;

        console.log("USERNAME: "+username);
    
        return username;
        
      }

    /*loggedIn(){
        let token = localStorage.getItem(Config.TOKEN_KEY);

        return token !== null;
    }*/
}
