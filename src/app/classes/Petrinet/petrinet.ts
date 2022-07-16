import { BpmnEdge } from "../Basic/Bpmn/BpmnEdge/BpmnEdge";
import { BpmnNode } from "../Basic/Bpmn/BpmnNode";
import { Arc } from "./arc";
import { Place } from "./place";
import { PlaceCounter } from "./place-counter";
import { PnSubnet } from "./pn-subnet";
import { Transition } from "./transition";

export class Petrinet {

    subnets: Array<PnSubnet>
    
    
    constructor() {
        this.subnets = new Array<PnSubnet>()
        PlaceCounter.reset()

    }

    print(): string {
        let text: string = ".type pn\n";

        text += this.printTransitions();
        text += this.printPlaces()
        text += this.printArcs();
        return text;
    }
    printTransitions(): string {
        let text: string = ".transitions\n";

        for (let trans of this.collectTransitions())
            text += trans.print() + "\n";

        return text;
    }

    printArcs(): string {
        let text: string = ".arcs\n";

        for (let arc of this.collectArcs())
            text += arc.print() + "\n";

        return text;
    }

    printPlaces(): string {
        let text: string = ".places\n";

        for (let place of this.collectPlaces())
            text += place.print() + "\n";

        return text;
    }

    private collectPlaces(): Array<Place> {
        let places: Array<Place> = new Array<Place>()
        for (let subnet of this.subnets)
            places.push(...subnet.places)

        return places
    }

    private collectArcs(): Array<Arc> {
        let arcs: Array<Arc> = new Array<Arc>()
        for (let subnet of this.subnets)
            arcs.push(...subnet.arcs)
        return arcs
    }

    private collectTransitions(): Array<Transition> {
        let transitions: Array<Transition> = new Array<Transition>()
        for (let subnet of this.subnets)
            transitions.push(...subnet.transitions)
        return transitions
    }
    public addNodes(edge: BpmnEdge): void {
        let before: PnSubnet = this.add(edge.from);
        let after: PnSubnet = this.add(edge.to);
        
        this.connectSubnets(before, after);
    }

    private connectSubnets(before: PnSubnet, after: PnSubnet): void{
        let input_place: Place = after.addInputPlace(before)
        after.addArc(Arc.create(before.transition, input_place));
    }

    private add(node: BpmnNode): PnSubnet {
        let subnet = this.getSubnet(node)
        if (this.getSubnet(node) === undefined) {
            subnet = new PnSubnet(node);
            this.subnets.push(subnet!);
        }
        return subnet!;
    }
    private getSubnet(newNode: BpmnNode): PnSubnet | undefined {
        for (let subnet of this.subnets)
            if (newNode.id === subnet.id)
                return subnet;

        return undefined;
    }

}



