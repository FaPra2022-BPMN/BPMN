import { BpmnEdge } from "src/app/classes/Basic/Bpmn/BpmnEdge/BpmnEdge";
import { BpmnGraph } from "src/app/classes/Basic/Bpmn/BpmnGraph";
import { BpmnNode } from "src/app/classes/Basic/Bpmn/BpmnNode";
import { BpmnEventEnd } from "src/app/classes/Basic/Bpmn/events/BpmnEventEnd";
import { BpmnEventStart } from "src/app/classes/Basic/Bpmn/events/BpmnEventStart";
import { BpmnGatewayJoinAnd } from "src/app/classes/Basic/Bpmn/gateways/BpmnGatewayJoinAnd";
import { BpmnGatewayJoinXor } from "src/app/classes/Basic/Bpmn/gateways/BpmnGatewayJoinXor";
import { BpmnGatewaySplitAnd } from "src/app/classes/Basic/Bpmn/gateways/BpmnGatewaySplitAnd";
import { BpmnTaskManual } from "src/app/classes/Basic/Bpmn/tasks/BpmnTaskManual";
import { BpmnTaskReceiving } from "src/app/classes/Basic/Bpmn/tasks/BpmnTaskReceiving";
import { BpmnTaskSending } from "src/app/classes/Basic/Bpmn/tasks/BpmnTaskSending";
import { BpmnTaskService } from "src/app/classes/Basic/Bpmn/tasks/BpmnTaskService";
import { BpmnTaskUserTask } from "src/app/classes/Basic/Bpmn/tasks/BpmnTaskUserTask";

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

    createEndEvent(): BpmnNode{
        return this.createNode(new BpmnEventEnd("EndEvent"), "EndEvent")
    }

    createStartEvent(): BpmnNode{
        return this.createNode(new BpmnEventStart("StartEv"), "Start");
    }

    createSendingTask(): BpmnNode{
        return this.createNode(new BpmnTaskSending("SendTask"), "SendTask");
    }

    createEdge(from: BpmnNode, to: BpmnNode): void{
        this.graph.addEdge(new BpmnEdge(this.edge_idx, from, to));
    }

    createReceivingTask(): BpmnNode{
        return this.createNode(new BpmnTaskReceiving("ReceiveTask"), "ReceiveTask")
    }

    createAndSplit(): BpmnNode{
        return this.createNode(new BpmnGatewaySplitAnd("ANDSplit"), "ANDSplit");
    }

    createUserTask(): BpmnNode{
        return this.createNode(new BpmnTaskUserTask("UserTask"), "UserTask");
    }

    createServiceTask(): BpmnNode{
        return this.createNode(new BpmnTaskService("ServiceTask"), "ServiceTask");
    }

    createJoinAnd(): BpmnNode{
        return this.createNode(new BpmnGatewayJoinAnd("ANDJoin"), "ANDJoin");
    }

    createXorJoin(): BpmnNode{
        return this.createNode(new BpmnGatewayJoinXor("XORJoin"), "XORJoin");
    }

    createManualTask(): BpmnNode{
        return this.createNode(new BpmnTaskManual("ManualTask"), "ManualTask");
    }
}