import { Injectable } from '@angular/core';
import { Config } from '../config';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard {

  public config : Config;

    constructor(private nav : Router) 
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
    canActivate()
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
    }

    loggedIn(){
        let token = localStorage.getItem(Config.TOKEN_KEY);

        return token !== null;
    }
}
