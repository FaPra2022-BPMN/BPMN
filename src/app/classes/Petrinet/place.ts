import { PlaceCounter } from "./place-counter";
import { PnElement } from "./pn-element"

export class Place extends PnElement {
   

    private constructor(public token: number) {
        super("p_" + PlaceCounter.get())
        PlaceCounter.increment()

    }

    static create(args: {isStartPlace: boolean}): Place {
        if (args.isStartPlace)
            return new Place(1);
        return new Place(0);
    }

    print(): string {
        return this.id + " " + this.token
    }


}