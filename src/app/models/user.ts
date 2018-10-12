import { Role } from "./role";

export class User
{
    public ID : number;
    public username : string;
    public password: string;
    public first_name : string;
    public last_name : string;
    public roles: Array<Role>;
    public status: boolean;
    public start_time: string;
    public end_time: string;

    constructor()
    {
        this.ID = 0;
        this.username = "";
        this.password = "";
        this.first_name = "";
        this.last_name = "";
        this.roles = [];
        this.status = true;
        this.start_time = "";
    }

}