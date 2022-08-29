import { BpmnUtils } from "../Bpmn/BpmnUtils";
import { BpmnGateway } from "../Bpmn/gateways/BpmnGateway";
import { SwitchableGraph } from "./SwitchableGraph";
import { SwitchableNode } from "./SwitchableNode";
import { SwitchState } from "./switchstatetype";
import { SwitchUtils } from "./SwitchUtils";

export abstract class SwitchController {
    private _startEvents: SwitchableNode[];
    private _nodes: SwitchableNode[];
    private _graph: SwitchableGraph;
 
    constructor(graph: SwitchableGraph) {
        this._startEvents = [];
        this._nodes = graph.switchNodes;
        this._graph = graph;
    }

    get nodes(): SwitchableNode[] {
        return this._nodes;
    }

    get graph(): SwitchableGraph {
        return this._graph;
    }


    /**
     * adds StartEvent node to collection of startEvents
     * @param node
     */
    addToStartEvents(node: SwitchableNode): void {
        node.switchTo(SwitchState.enableable)
        SwitchUtils.addItem(node, this._startEvents)
    }

    /** when one of the StartEvents is enabled - this method disables all other StartEvents
     * @param theOneAndOnlyStartEvent the enabled StartEvent node
     */
    private disableAllOtherStartEvents(theOneAndOnlyStartEvent: SwitchableNode) {
        this._startEvents.forEach(startEvent => {
            if (!(theOneAndOnlyStartEvent === startEvent)) startEvent.disable();
        });
    }

    /**
         * resets diagram into initial state to start switching from start event
         */
    private newGame() {
        this._nodes.forEach(node => node.disable());
        this._startEvents.forEach(event => {
            event.switchTo(SwitchState.enableable)
        });
    }




    /** Print all Node IDs*/
    printNodeIDFromList(nodes: SwitchableNode[]) {
        let str: String = "";
        nodes.forEach(node => str += node.id + ", ");
        str += " ENDE.";
        console.log(str);
    }

    /** changes state of the clicked node and connected nodes
      * @param clickedNode the clicked node
      */
    public press(clickedNode: SwitchableNode) {
        //this.checkIsWellHandled();
        if (clickedNode.switchState === SwitchState.enableable || clickedNode.switchState === SwitchState.switchedButEnableForLoopRun) {
            if (clickedNode.isStartEvent()) this.disableAllOtherStartEvents(clickedNode);
            this.press_typ(clickedNode);
        } else {

            if (clickedNode.enabled() && clickedNode.isEndEvent()) {
                this.newGame();
            } else {
                console.warn("Der Knoten mit der ID: " + clickedNode.id + " ist nicht aktivierbar, er hat den Status: " + clickedNode.switchState);
            }
        }
    }

    abstract press_typ(clickedNode: SwitchableNode) : void;


/**
 * This method checks once if the graph is well-handled.
 */
    checkIsWellHandled() : string {
        let text : string = "";
        let arrayOfGateways : SwitchableNode[] = [];
        this._graph.switchNodes.forEach(node => {
        if(node.isGateway()) {
            let associateGateway = BpmnUtils.getCorrespondingGatewayWithoutType(node.bpmnNode as BpmnGateway);            
            if (associateGateway == undefined) { 
                arrayOfGateways.push(node);
                }
            }
        });
        if(arrayOfGateways.length > 0) {
                text = "Hinweis: ";
                text += (arrayOfGateways.length > 1)?"Die Gateways mit den IDs: [":"Das Gateway mit der ID: [";
                arrayOfGateways.forEach(node => {
                    text += node.id +", ";
                });
                text = text.substring(0, text.length-2);
                text += (arrayOfGateways.length > 1)?"] besitzen ":"] besitzt ";
                text += "keinen oder keinen eindeutigen Partner. Dies bedeutet, dass dieser Graph nicht well-handled ist. Bei OR Gateways ohne passendes Gegenstück wird die lokale Semantik zum Joinen verwendet.";
                console.warn(text);
            }
        return text;
    }
}
