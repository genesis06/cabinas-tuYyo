import { Vehicule } from "./vehicule";

export class Rent{

    public cabinID: number;
    public contractedTime: number;
    public vehicules: Array<any>;
    public checkIn: string;
    public checkOut: string;
    public necessaryRepairs: string;
    public observations: string;

    constructor(){
        this.cabinID = 0;
        this.contractedTime = 0;
        this.vehicules = [];
        this.checkIn = "";
        this.checkOut = "";
        this.necessaryRepairs = "";
        this.observations = "";
    }
}