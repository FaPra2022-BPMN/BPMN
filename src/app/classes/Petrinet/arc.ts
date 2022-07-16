import { PnElement } from "./pn-element";
import { Petrinet } from "./petrinet";
import { Place } from "./place";
import { Transition } from "./transition";

export class Arc {
    _id: string = "";
    private constructor(public _from: PnElement, public _to: PnElement, public _weight: number | 1) {
      
    }

    static create(from: PnElement, to: PnElement): Arc{
        let arc: Arc = new Arc(from, to, Arc.calcWeight())

        return arc;
    }

    static calcWeight(): number{
        return 1;
    }

    print(): string {

        return this._from._id + " " + this._to._id + " " + this._weight
    }
}