import { BpmnGraph } from "src/app/classes/Basic/Bpmn/BpmnGraph";
import { BpmnNode } from "src/app/classes/Basic/Bpmn/BpmnNode";

export class TestGraph {
    _edge_idx: number
    graph: BpmnGraph
    constructor(){
        this.graph = new BpmnGraph();
        this._edge_idx = 0;
    }

    createNode(node: BpmnNode, label: string): BpmnNode {
        node.label = label
        this.graph.addNode(node)
        return node
    }

    get edge_idx(): string{
        this._edge_idx++
        return this._edge_idx.toString()
    }
}