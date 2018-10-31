import { Articule } from "./articule";

export class Sale{
    constructor(public date: string, public articules: Array<Articule>){}
}