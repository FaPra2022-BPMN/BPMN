
import { BpmnNode } from "../Basic/Bpmn/BpmnNode";
import { Arc } from "./arc";
import { Place } from "./place";
import { PnSubnet } from "./pn-subnet";

export class PnAndJoin extends PnSubnet {
    constructor(bpmnNode: BpmnNode) {
        super(bpmnNode);

        //create as many places as there are incoming edges
        //connect every place with the only transition
        while (this.places.length != bpmnNode.inEdges.length){
            let place = this.addPlace(Place.create({isStartPlace: false}));
            this.addArc(Arc.create(place, this.transitions[0]))
        }
    }

   override get inputPlace(): Place {
       let notConnectedPlace = this.findNotConnectedInputPlace();
       notConnectedPlace?.setConnected()

       return notConnectedPlace!;
   }


}