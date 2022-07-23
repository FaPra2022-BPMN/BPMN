import { BpmnNode } from "../Basic/Bpmn/BpmnNode";
import { Arc } from "./arc";
import { Place } from "./place";
import { PnElement } from "./pn-element";
import { PnSubnet } from "./pn-subnet";
import { Transition } from "./transition";

export class PnXorSplit extends PnSubnet {

    constructor(bpmnNode: BpmnNode) {
        super(bpmnNode);

         //for adding index to the label of each transition
         let counter: number = 1;

         //one transition already exists
         this.transition.addCounterToLabelAndId(counter++);

        //create as many transitions as there are outgoing edges
        //connect the only one incoming place to all the transitions
        while (this.transitions.length != bpmnNode.outEdges.length){
            let trans = this.createTransitionWithIndex(bpmnNode, counter++);
            this.addArc(Arc.create(this.inputPlace, trans))
        }
            
    }

    override addArcTo(to: PnElement){
        let transition: Transition = this.findNotConnectedTransition()!;
        let arc: Arc = Arc.create(transition, to);
        transition.setConnected();
        this.addArc(arc);
    }

   
}