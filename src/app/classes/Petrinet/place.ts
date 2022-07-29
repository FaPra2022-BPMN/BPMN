import { PlaceCounter } from "./place-counter";
import { PnElement } from "./pn-element"

export class Place extends PnElement {
   

    private constructor(id: number, public token: number) {
        super("p_" + id)
        
    }

    static create(args: {isStartPlace: boolean}): Place {

        //token = 1 for start place
        if (args.isStartPlace){
           
            let id = PlaceCounter.getStartEventCounter();
            PlaceCounter.incrementStartEventsCounter()
            return new Place(id, 1);
        }
        
        //token = 0 for non-start place
        let id = PlaceCounter.get();
        PlaceCounter.increment()
        return new Place(id, 0);
    }

    print(): string {
        return this.id + " " + this.token
    }


}