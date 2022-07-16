import { BpmnNode } from "../Basic/Bpmn/BpmnNode";
import { Arc } from "./arc";
import { Place } from "./place";
import { PnElement } from "./pn-element";
import { PnSubnet } from "./pn-subnet";
import { Transition } from "./transition";

export class PnXorJoin extends PnSubnet {
    constructor(bpmnNode: BpmnNode) {
        super(bpmnNode);

        //create as many transitions as there are incoming edges
        while (this.transitions.length != bpmnNode.inEdges.length)
            this.addTransition(new Transition(`${bpmnNode.id}${this.transitions.length + 1}`, bpmnNode.label))

    }



    override addInputPlace(subnetBefore: PnSubnet): Place {
        let inputPlace: Place = this.addPlace(Place.create({ isStartPlace: false }));
        let transition: Transition = this.findNotConnectedTransition()!;
        this.addArc(Arc.create(inputPlace, transition))
        transition.setConnected();
        return inputPlace;
    }

    override addArcTo(to: PnElement) {
        for (let transition of this.transitions) {
            let arc: Arc = Arc.create(transition, to)
            this.addArc(arc)
        }

    }


}