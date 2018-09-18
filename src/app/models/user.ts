import { Role } from "./role";

export class User
{
    public ID : number;
    public username : string;
    public password: string;
    public firstName : string;
    public lastName : string;
    public roles: Array<Role>;

    constructor()
    {
        this.ID = 0;
        this.username = "";
        this.password = "";
        this.firstName = "";
        this.lastName = "";
        this.roles = [];
        //this.status = true;
    }

}