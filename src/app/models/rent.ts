import { Vehicule } from "./vehicule";

export class Rent{

    public ID: number;
    public cabinID: number;
    public contractedTime: number;
    public vehicules: Array<any>;
    public checkIn: string;
    public checkOut: string;
    public necessaryRepairs: string;
    public observations: string;

    constructor(){
        this.ID = 0;
        this.cabinID = 0;
        this.contractedTime = 0;
        this.vehicules = [];
        this.checkIn = "";
        this.checkOut = "";
        this.necessaryRepairs = "";
        this.observations = "";
    }

    setInformation(rent: any){
        this.ID = rent.id;
        this.cabinID = rent.cabin_id;
        this.contractedTime = rent.contracted_time;
        this.vehicules = rent.vehicules;
        this.checkIn = rent.check_in;
        this.checkOut = rent.check_out;
        this.necessaryRepairs = rent.necessary_repairs;
        this.observations = rent.observations;

        console.log(this.vehicules)
    }
}