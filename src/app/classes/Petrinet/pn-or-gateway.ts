import { Arc } from "./arc";
import { CombiTransition } from "./combi-transition";
import { PnSubnet } from "./pn-subnet";
import { Transition } from "./transition";

export class PnOrGateway extends PnSubnet {


    override get arcs(): Arc[] {
        return this._arcs.sort((arc1, arc2) => arc1._from.id.localeCompare(arc2._from.id))
    }

    override get transitions(): Transition[] {
        return this._transitions.sort((trans1, trans2) => trans1.id.localeCompare(trans2.id))
    }

    isCombi(trans: Transition): boolean {
        return trans instanceof CombiTransition;
    }

    //not transitions combining different paths
    get simpleTransitions(): Array<Transition> {
        return this.transitions.filter(trans => !this.isCombi(trans));
    }

    override findNotConnectedTransition(): Transition | undefined {
        return this.simpleTransitions.find(trans => !trans.connected)

    }

    //transitions that represent AND combinations of paths 
    get combiTransitions(): Array<CombiTransition> {
        return this.transitions.filter(trans => this.isCombi(trans)).map(
            trans => trans as CombiTransition
        )
    }
}