import { BpmnNode } from "../Basic/Bpmn/BpmnNode";
import { Arc } from "./arc";
import { Place } from "./place";
import { PnSubnet } from "./pn-subnet";

export class PnStartEvent extends PnSubnet {

    constructor(bpmnNode: BpmnNode) {
        super(bpmnNode);

    }
    override addInputPlace(): Place {
       return this.addPlace(Place.create({ isStartPlace: true }));
    }

}