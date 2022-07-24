import { BpmnNode } from "../Basic/Bpmn/BpmnNode";
import { Arc } from "./arc";
import { CombiTransition } from "./combi-transition";
import { Place } from "./place";
import { PnElement } from "./pn-element";
import { PnOrGateway } from "./pn-or-gateway";
import { PnUtils } from "./pn-utils";
import { Transition } from "./transition";

export class PnOrJoin extends PnOrGateway {

    constructor(bpmnNode: BpmnNode) {
        super(bpmnNode);

        //for adding index to the label of each transition
        let counter: number = 1;

        //one transition already exists
        this.transitions[0].addCounterToLabelAndId(counter++);

        //create as many transitions as there are incoming edges
        //for every transition - add incoming place
        while (this.transitions.length < bpmnNode.inEdges.length) {
            let trans = this.addTransition(new Transition(bpmnNode.id, bpmnNode.label, counter++));
            let inPlace = this.addInputPlace();
            this.addArc(Arc.create(inPlace, trans))
        }

        let combinationsOfIds: string[][] = PnUtils.getCombinationsOfIds(PnUtils.getIds(this.simpleTransitions))
        for (let combinationOfIds of combinationsOfIds) {

            let combiTrans = new CombiTransition(bpmnNode.id, bpmnNode.label,
                this.getTransitionsByIds(combinationOfIds));
            this.addTransition(combiTrans);

            for (let transId of combinationOfIds) {
                let trans = this.getTransitionById(transId)!;
                let inPlace = this.getInputPlace(trans)!;              
                this.addArc(Arc.create(inPlace, combiTrans))
            }

        }

    }

    private getInputPlace(trans: Transition): PnElement | null {

        for (let arc of this.arcs)
            if (arc._to === trans)
                return arc._from
        return null;
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