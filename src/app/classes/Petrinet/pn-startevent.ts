import { BpmnNode } from "../Basic/Bpmn/BpmnNode";
import { Arc } from "./arc";
import { Place } from "./pn-place";
import { PnSubnet } from "./pn-subnet";
import { Transition } from "./pn-transition";

/**
 * BPMN start event is represented by a transition connected to the single start place of the petri net
 */
export class PnStartEvent extends PnSubnet {


    _inputPlace: Place

    constructor(bpmnNode: BpmnNode, startPlace: Place) {
        super(bpmnNode);

        let transition = this.addTransition(new Transition(bpmnNode.id, bpmnNode.label))
        this._inputPlace = startPlace

        let arc = Arc.create(this._inputPlace, transition);
        this.addArc(arc);
    }

    get transitionsToConnectToNextSubnet(): Array<Transition> {
        let transitions = new Array<Transition>()
        let trans = this.transitions[0]
        if (trans)
            transitions.push(trans)
        return transitions
    }
    get placeToConnectToPreviousSubnet(): Place | undefined {
        return this._inputPlace
    }


}