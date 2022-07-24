import { BpmnNode } from "../Basic/Bpmn/BpmnNode";
import { Arc } from "./arc";
import { Place } from "./place";
import { PnElement } from "./pn-element";
import { PnSubnet } from "./pn-subnet";
import { Transition } from "./transition";

export class PnXorJoin extends PnSubnet {
    constructor(bpmnNode: BpmnNode) {
        super(bpmnNode);

         //for adding index to the label of each transition
         let counter: number = 1;

         //one transition already exists
         this.transition.addCounterToLabelAndId(counter++);

        //create as many transitions as there are incoming edges
        //for every transition - add incoming place
        while (this.transitions.length != bpmnNode.inEdges.length){
            let trans = this.addTransition(new Transition(bpmnNode.id, bpmnNode.label,counter++))
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