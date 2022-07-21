import { PnElement } from "./pn-element";
import { Transition } from "./transition";

export class CombiTransition extends Transition{
    transitions: Array<Transition>
    constructor(_id: string, transitions: Array<Transition>){
        super(_id, _id);
        this.transitions = transitions
    }

    

    

}