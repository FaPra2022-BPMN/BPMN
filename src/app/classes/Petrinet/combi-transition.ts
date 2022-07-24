import { Transition } from "./transition";


/**
 * transitions that represent AND combinations of paths in OR gateways
 */
export class CombiTransition extends Transition {
    transitions: Array<Transition>
    constructor(id: string, label: string, transitions: Array<Transition>) {
        super(id, id);
        this.transitions = transitions

        //set index as combination of indexes of combined transitions
        let combiId: string = transitions.map(trans => trans.counter).join("-");
        this.id += combiId;
        this.label += combiId;
    }

    getIds(): Array<string> {
        return this.transitions.map(trans => trans.id);
    }






}