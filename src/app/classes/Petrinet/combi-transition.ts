import { Transition } from "./transition";


/**
 * represents AND-combinations of OR-paths when converting OR gateways in BPMN graphs
 */
export class CombiTransition extends Transition {
    transitions: Array<Transition>
    constructor(id: string, label: string, transitions: Array<Transition>) {
        super(id, id);
        this.transitions = transitions //simple transitions combined to create this one

        //set index as combination of indexes of combined transitions
        let combiId: string = transitions.map(trans => trans.counter).join("-");
        this.id += combiId;
        this.label += combiId;
    }

    /**
     * 
     * @returns ids of all transitions that are AND-combined to create this transition
     */
    getIds(): Array<string> {
        return this.transitions.map(trans => trans.id);
    }






}