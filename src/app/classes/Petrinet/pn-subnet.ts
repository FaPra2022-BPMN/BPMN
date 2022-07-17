import { BpmnNode } from "../Basic/Bpmn/BpmnNode";
import { BpmnEventEnd } from "../Basic/Bpmn/events/BpmnEventEnd";
import { BpmnEventStart } from "../Basic/Bpmn/events/BpmnEventStart";
import { BpmnGatewayJoinAnd } from "../Basic/Bpmn/gateways/BpmnGatewayJoinAnd";
import { BpmnGatewayJoinXor } from "../Basic/Bpmn/gateways/BpmnGatewayJoinXor";
import { BpmnGatewaySplitXor } from "../Basic/Bpmn/gateways/BpmnGatewaySplitXor";
import { Arc } from "./arc";
import { Place } from "./place";
import { PnElement } from "./pn-element";
import { PnXorJoin } from "./pn-xor-join";
import { PnXorSplit } from "./pn-xor-split";
import { Transition } from "./transition";

export class PnSubnet {
    id: string;
    _inputPlace: Place;
    _transition: Transition

    _transitions: Array<Transition>;
    _places: Array<Place>;
    _arcs: Array<Arc>;


    constructor(public bpmnNode: BpmnNode) {

        this.id = bpmnNode.id;
        this._transitions = new Array<Transition>();
        this._places = new Array<Place>();
        this._arcs = new Array<Arc>();

        this._transition = this.addTransition(new Transition(bpmnNode.id, bpmnNode.label))
        this._inputPlace = this.addInputPlace();
        this.addArc(Arc.create(this._inputPlace, this.transition))
    }

    get inputPlace(): Place{
        return this._inputPlace
    }

    public isEndEvent(): boolean {
        return this.bpmnNode instanceof BpmnEventEnd
    }

    public get transition(): Transition {
        return this._transition
    }

    addArc(arc: Arc): Arc {
        if (!this.arcs.includes(arc))
            this.arcs.push(arc)
        
        return arc
    }

    addArcTo(to: PnElement) {
        let arc: Arc = Arc.create(this.transition, to);
        this.addArc(arc);
    }

    addPlace(place: Place): Place {
        if (!this.places.includes(place))
            this.places.push(place)

        return place
    }

    addTransition(trans: Transition): Transition {
        if (!this.transitions.includes(trans))
            this.transitions.push(trans)

        return trans
    }

    findNotConnectedInputPlace(): Place | null {

        for (let place of this.places) {
            
            if (!place.isConnected())
                return place;
        }

        return null;
    }

    findNotConnectedTransition(): Transition | null {

        for (let transition of this.transitions) {

            if (!transition.isConnected())
                return transition;
        }

        return null;
    }

    public get places(): Array<Place> {
        return this._places;
    }

    get transitions(): Array<Transition> {
        return this._transitions;
    }
    get arcs(): Array<Arc> {
        return this._arcs;
    }

    addInputPlace(): Place {
        return this.addPlace(Place.create({ isStartPlace: false }));
    }

}