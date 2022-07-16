import { BpmnNode } from "../Basic/Bpmn/BpmnNode";
import { Arc } from "./arc";
import { Place } from "./place";
import { PnSubnet } from "./pn-subnet";

export class PnEndEvent extends PnSubnet {

    constructor(bpmnNode: BpmnNode) {
        super(bpmnNode);

    }
    addEndPlace(): void {
        let endPlace: Place = this.addPlace(Place.create({ isStartPlace: false }))
        this.addArc(Arc.create(this.transition, endPlace))
    }

}