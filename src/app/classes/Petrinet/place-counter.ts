export class PlaceCounter{

    private static place_idx: number;

    static reset(){
        PlaceCounter.place_idx = 1
    }

    static increment(){
        PlaceCounter.place_idx++
    }

    static get(){
        return PlaceCounter.place_idx
    }
}