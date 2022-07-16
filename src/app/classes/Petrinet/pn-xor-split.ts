import { BpmnNode } from "../Basic/Bpmn/BpmnNode";
import { Arc } from "./arc";
import { Place } from "./place";
import { PnElement } from "./pn-element";
import { PnSubnet } from "./pn-subnet";
import { Transition } from "./transition";

export class PnXorSplit extends PnSubnet {

    constructor(bpmnNode: BpmnNode) {
        super(bpmnNode);

        //create as many transitions as there are outgoing edges
        console.log("OUT XOR SPLIT " + bpmnNode.outEdges.length)
        while (this.transitions.length != bpmnNode.outEdges.length)
            this.addTransition(new Transition(bpmnNode.id + this.transitions.length, bpmnNode.label))
    }

    override addInputPlace(subnetBefore: PnSubnet): Place {
        let inputPlace: Place = this.addPlace(Place.create({ isStartPlace: false }));
        for (let transition of this.transitions)
            this.addArc(Arc.create(inputPlace, transition))

        return inputPlace;
    }

    override addArcTo(to: PnElement){
        let transition: Transition = this.findNotConnectedTransition()!;
        let arc: Arc = Arc.create(transition, to);
        transition.setConnected();
        this.addArc(arc);
    }

   
}