import { PlaceCounter } from "./place-counter";
import { PnElement } from "./pn-element"

export class Place extends PnElement {
    _token: number

    private constructor(token: number) {
        super("p_" + PlaceCounter.get())
        PlaceCounter.increment()

        this._token = token
    }

    static create(args: {isStartPlace: boolean}): Place {
        if (args.isStartPlace)
            return new Place(1);
        return new Place(0);
    }

    print(): string {
        return this._id + " " + this._token
    }


}