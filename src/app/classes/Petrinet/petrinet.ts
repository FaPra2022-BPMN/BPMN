import { BpmnNode } from "../Basic/Bpmn/BpmnNode";
import { BpmnEventEnd } from "../Basic/Bpmn/events/BpmnEventEnd";
import { BpmnEventStart } from "../Basic/Bpmn/events/BpmnEventStart";
import { BpmnGatewayJoinAnd } from "../Basic/Bpmn/gateways/BpmnGatewayJoinAnd";
import { BpmnGatewayJoinXor } from "../Basic/Bpmn/gateways/BpmnGatewayJoinXor";
import { BpmnGatewaySplitXor } from "../Basic/Bpmn/gateways/BpmnGatewaySplitXor";
import { Arc } from "./arc";
import { Place } from "./place";
import { PlaceCounter } from "./place-counter";
import { PnAndJoin } from "./pn-and-join";
import { PnEndEvent } from "./pn-endevent";
import { PnStartEvent } from "./pn-startevent";
import { PnSubnet } from "./pn-subnet";
import { PnXorJoin } from "./pn-xor-join";
import { PnXorSplit } from "./pn-xor-split";
import { Transition } from "./transition";

export class Petrinet {

    subnets: Array<PnSubnet>

    constructor(bpmnNodes: Array<BpmnNode>) {
        this.subnets = new Array<PnSubnet>()
        PlaceCounter.reset()

        for (let bpmnNode of bpmnNodes)
            this.addNodes(bpmnNode);

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
    public addNodes(bpmnNode: BpmnNode): void {
        for (let outEdge of bpmnNode.outEdges) {
            let before: PnSubnet = this.add(bpmnNode);
            let after: PnSubnet = this.add(outEdge.to);

            this.connectSubnets(before, after);
        }


    }

    private connectSubnets(before: PnSubnet, after: PnSubnet): void {
        before.addArcTo(after.inputPlace);
    }

    private add(bpmnNode: BpmnNode): PnSubnet {
        let subnet = this.getSubnet(bpmnNode)
        if (this.getSubnet(bpmnNode) === undefined) {
            subnet = this.createPnSubnet(bpmnNode)
            this.subnets.push(subnet!);
        }
        return subnet!;
    }

    private createPnSubnet(bpmnNode: BpmnNode): PnSubnet {
        if (bpmnNode instanceof BpmnGatewaySplitXor)
            return new PnXorSplit(bpmnNode);
        if (bpmnNode instanceof BpmnGatewayJoinXor)
            return new PnXorJoin(bpmnNode);
        if (bpmnNode instanceof BpmnEventEnd)
            return new PnEndEvent(bpmnNode);

        if (bpmnNode instanceof BpmnEventStart)
            return new PnStartEvent(bpmnNode);

        if (bpmnNode instanceof BpmnGatewayJoinAnd)
            return new PnAndJoin(bpmnNode);
        return new PnSubnet(bpmnNode)
    }
    private getSubnet(newNode: BpmnNode): PnSubnet | undefined {
        for (let subnet of this.subnets)
            if (newNode.id === subnet.id)
                return subnet;

        return undefined;
    }

}



