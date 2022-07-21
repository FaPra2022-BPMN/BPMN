import { BpmnNode } from "../Basic/Bpmn/BpmnNode";
import { Arc } from "./arc";
import { PnElement } from "./pn-element";
import { PnSubnet } from "./pn-subnet";
import { PnUtils } from "./pn-utils";
import { Transition } from "./transition";

export class PnOrSplit extends PnSubnet {

    combiTransitions: Map<string, Array<string>>;
    constructor(bpmnNode: BpmnNode) {
        super(bpmnNode);

        //create as many transitions as there are outgoing edges
        //connect the only one incoming place to all the transitions
        let counter: number = 2;
        while (this.transitions.length != bpmnNode.outEdges.length) {
            let trans = this.addTransition(new Transition(bpmnNode.id + counter, bpmnNode.label+ counter))
            this.addArc(Arc.create(this.inputPlace, trans))
            counter++;
        }

        //transitions that will represent AND combinations of different paths 
        this.combiTransitions = new Map<string, Array<string>>();

        let id_lists: string[][] = PnUtils.getCombinationsOfIds(this.getTransIds())
        for (let id_list of id_lists) {
            let trans: Transition = this.addTransition(new Transition(bpmnNode.id + counter, bpmnNode.label+ counter))
            this.combiTransitions.set(trans.id, id_list)
            this.addArc(Arc.create(this.inputPlace, trans))
            counter++;
        }
    }

    private getTransIds(): Array<string> {
        let ids: Array<string> = new Array<string>();
        for (let trans of this.transitions)
            ids.push(trans.id)

        return ids;
    }

    private isCombi(trans: Transition): boolean {
        console.log("combi? " + trans.id + " ")
        return this.combiTransitions.get(trans.id) != undefined;
    }

    getTransitionById(id: string): Transition | null {
        for (let trans of this.transitions)
            if (trans.id === id)
                return trans

        return null
    }
    override addArcTo(to: PnElement) {
        let transition: Transition = this.findNotConnectedTransition()!;
        let arc: Arc = Arc.create(transition, to);
        transition.setConnected();
        this.addArc(arc);

        //connect every combiTransition that contains the transition in its combination
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
                combis.push(this.getTransitionById(key)!);
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