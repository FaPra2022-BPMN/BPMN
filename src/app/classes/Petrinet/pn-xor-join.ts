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
        //for every transition - add incoming place
        while (this.transitions.length != bpmnNode.inEdges.length){
            let trans = this.addTransition(new Transition(`${bpmnNode.id}${this.transitions.length + 1}`, bpmnNode.label));
            let inPlace = this.addInputPlace();
            this.addArc(Arc.create(inPlace, trans))
        }
    }

   override get inputPlace(): Place {
       let notConnectedPlace = this.findNotConnectedInputPlace();
       notConnectedPlace?.setConnected()

       return notConnectedPlace!;
   }

    override addArcTo(to: PnElement) {
        for (let transition of this.transitions) {
            let arc: Arc = Arc.create(transition, to)
            this.addArc(arc)
        }

    }


}