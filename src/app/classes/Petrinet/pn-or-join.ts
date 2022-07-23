import { BpmnNode } from "../Basic/Bpmn/BpmnNode";
import { Arc } from "./arc";
import { Place } from "./place";
import { PnElement } from "./pn-element";
import { PnSubnet } from "./pn-subnet";
import { PnUtils } from "./pn-utils";
import { Transition } from "./transition";

export class PnOrJoin extends PnSubnet {

    //transitions that represent AND combinations of paths 
    combiTransitions: Map<string, Array<string>>;


    constructor(bpmnNode: BpmnNode) {
        super(bpmnNode);

        //for adding index to the label of each transition
        let counter: number = 1;

        //one transition already exists
        this.transition.addCounterToLabelAndId(counter++);

        //create as many transitions as there are incoming edges
        //for every transition - add incoming place
        while (this.transitions.length != bpmnNode.inEdges.length) {
            let trans = this.createTransitionWithIndex(bpmnNode, counter++);
            let inPlace = this.addInputPlace();
            this.addArc(Arc.create(inPlace, trans))
        }
        //transitions that represent AND combinations of paths 
        this.combiTransitions = new Map<string, Array<string>>();

        let combinationsOfIds: string[][] = PnUtils.getCombinationsOfIds(PnUtils.getIds(this.transitions))
        for (let combinationOfIds of combinationsOfIds) {
            let combiTrans: Transition = this.createTransitionWithIndex(bpmnNode, counter++)
            this.combiTransitions.set(combiTrans.id, combinationOfIds)

            for (let transId of combinationOfIds) {
                let trans = PnUtils.getTransitionById(transId, this.transitions)!;
                let inPlace = this.getInputPlace(trans)!;

                if (!this.arcExists(inPlace, combiTrans))
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