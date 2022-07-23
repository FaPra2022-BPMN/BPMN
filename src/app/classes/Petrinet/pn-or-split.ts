import { BpmnNode } from "../Basic/Bpmn/BpmnNode";
import { Arc } from "./arc";
import { PnElement } from "./pn-element";
import { PnSubnet } from "./pn-subnet";
import { PnUtils } from "./pn-utils";
import { Transition } from "./transition";

export class PnOrSplit extends PnSubnet {

    //transitions that represent AND combinations of paths 
    combiTransitions: Map<string, Array<string>>;

    constructor(bpmnNode: BpmnNode) {
        super(bpmnNode);

        //for adding index to the label of each transition
        let counter: number = 1;

        //one transition already exists
        this.transition.addCounterToLabelAndId(counter++);

        //create as many transitions as there are outgoing edges
        //connect the only one incoming place to all the transitions
        while (this.transitions.length != bpmnNode.outEdges.length) {
            let trans = this.createTransitionWithIndex(bpmnNode, counter++);
            this.addArc(Arc.create(this.inputPlace, trans))
        }

        //transitions that represent AND combinations of paths 
        this.combiTransitions = new Map<string, Array<string>>();

        let combinationsOfIds: string[][] = PnUtils.getCombinationsOfIds(PnUtils.getIds(this.transitions))
        for (let combinationOfIds of combinationsOfIds) {
            let trans = this.createTransitionWithIndex(bpmnNode, counter++);
            this.combiTransitions.set(trans.id, combinationOfIds)
            this.addArc(Arc.create(this.inputPlace, trans))
        }

    }

    private isCombi(trans: Transition): boolean {
        return this.combiTransitions.get(trans.id) != undefined;
    }


    override addArcTo(to: PnElement) {
        let transition: Transition = this.findNotConnectedTransition()!;
        let arc: Arc = Arc.create(transition, to);
        transition.setConnected();
        this.addArc(arc);

        //connect every combiTransition that contains 
        //the id of the previously connected transition in its corresponding combination list
        let combis: Array<Transition> = this.findCombiTransitionsContainingId(transition.id);

        for (let combi of combis) {
            let arc: Arc = Arc.create(combi, to);
            this.addArc(arc);
        }


    }

    findCombiTransitionsContainingId(mainTransId: string): Array<Transition> {
        let combis: Array<Transition> = new Array();

        this.combiTransitions.forEach((transIdsList: string[], key: string) => {
            if (transIdsList.includes(mainTransId))
                combis.push(PnUtils.getTransitionById(key, this.transitions)!);
        })

        return combis;
    }



    override findNotConnectedTransition(): Transition | null {
        for (let transition of this.transitions) {

            if (!transition.isConnected() && !this.isCombi(transition))
                return transition;
        }

        return null;

    }


}