import { Vehicule } from "./vehicule";

export class Rent{

    public id: number;
    public cabin_id: number;
    public contracted_time: number;
    public vehicules: Array<any>;
    public check_in: any;
    public check_out: any;
    public necessary_repairs: string;
    public observations: string;
    public lost_stuff: string;

    constructor(){
        this.id = 0;
        this.cabin_id = 0;
        this.contracted_time = 0;
        this.vehicules = [];
        this.check_in = "";
        this.check_out = "";
        this.necessary_repairs = "";
        this.observations = "";
        this.lost_stuff = "";
    }
}