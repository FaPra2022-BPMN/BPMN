export class PlaceCounter{

    private static place_idx: number;
    private static startEventPlace_idx: number;

    static reset(startIndex : number){
        this.place_idx = startIndex
        this.startEventPlace_idx = 1
    }

    static increment(){
        this.place_idx++
    }

    static incrementStartEventsCounter(){
        this.startEventPlace_idx++
    }

    static get(){
        return this.place_idx
    }

    static getStartEventCounter(){
        return this.startEventPlace_idx
    }
}