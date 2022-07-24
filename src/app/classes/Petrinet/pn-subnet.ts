import { ComponentFactoryResolver } from "@angular/core";
import { BpmnNode } from "../Basic/Bpmn/BpmnNode";
import { BpmnEventEnd } from "../Basic/Bpmn/events/BpmnEventEnd";
import { Arc } from "./arc";
import { Place } from "./place";
import { PnElement } from "./pn-element";
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

    arcExists(from: PnElement, to: PnElement): boolean {
        for (let arc of this.arcs)
            if (arc._from === from && arc._to === to)
                return true;
        return false;
    }

    get inputPlace(): Place {
        return this._inputPlace
    }

    public isEndEvent(): boolean {
        return this.bpmnNode instanceof BpmnEventEnd
    }

    public get transition(): Transition {
        return this._transition
    }

    addArc(arc: Arc): Arc {
        if (!this.arcExists(arc._from, arc._to))
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

    findNotConnectedTransition(): Transition | undefined {

        return this.transitions.find(trans => !trans.connected)
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

    getTransitionsByIds(ids: Array<string>): Array<Transition> {
        return this.transitions.filter(trans => ids.includes(trans.id))
    }

    getTransitionById(id: string): Transition | undefined {
        return this.transitions.find(trans => id === trans.id)
    }

}