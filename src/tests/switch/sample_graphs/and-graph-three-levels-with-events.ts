import { BpmnEdge } from "src/app/classes/Basic/Bpmn/BpmnEdge/BpmnEdge";
import { BpmnGraph } from "src/app/classes/Basic/Bpmn/BpmnGraph";
import { BpmnEventEnd } from "src/app/classes/Basic/Bpmn/events/BpmnEventEnd";
import { BpmnEventIntermediate } from "src/app/classes/Basic/Bpmn/events/BpmnEventIntermediate";
import { BpmnEventStart } from "src/app/classes/Basic/Bpmn/events/BpmnEventStart";
import { BpmnGatewayJoinAnd } from "src/app/classes/Basic/Bpmn/gateways/BpmnGatewayJoinAnd";
import { BpmnGatewaySplitAnd } from "src/app/classes/Basic/Bpmn/gateways/BpmnGatewaySplitAnd";
import { BpmnTaskBusinessRule } from "src/app/classes/Basic/Bpmn/tasks/BpmnTaskBusinessRule";
import { BpmnTaskManual } from "src/app/classes/Basic/Bpmn/tasks/BpmnTaskManual";
import { BpmnTaskReceiving } from "src/app/classes/Basic/Bpmn/tasks/BpmnTaskReceiving";
import { BpmnTaskService } from "src/app/classes/Basic/Bpmn/tasks/BpmnTaskService";
import { BpmnTaskUserTask } from "src/app/classes/Basic/Bpmn/tasks/BpmnTaskUserTask";
import { TestGraph } from "./TestGraph";

export class AndGraphThreeLevelsWithEvents extends TestGraph {

    constructor() {
        super()
        //startEvent --> Task1
        let startEvent = this.createNode(new BpmnEventStart("StartEv"), "Start");
        let task1 = this.createNode(new BpmnTaskService("Task1"), "ServiceTask");
        this.graph.addEdge(new BpmnEdge(this.edge_idx, startEvent, task1));

        //Task1 --> SPLIT_AND gateway
        let gatewaySplitAnd = this.createNode(new BpmnGatewaySplitAnd("AndSplit"), "AndSplit");
        this.graph.addEdge(new BpmnEdge(this.edge_idx, task1, gatewaySplitAnd));


        //SPLIT_AND gateway --> Task2
        let task2 = this.createNode(new BpmnTaskManual("Task2"), "ManualTask");
        this.graph.addEdge(new BpmnEdge(this.edge_idx, gatewaySplitAnd, task2));

        //SPLIT_AND gateway --> Task3
        let task3 = this.createNode(new BpmnTaskUserTask("Task3"), "UserTask");
        this.graph.addEdge(new BpmnEdge(this.edge_idx, gatewaySplitAnd, task3));

        //Task2 --> Intermediate Event
        let eventInt = this.createNode(new BpmnEventIntermediate("IntEvent"), "IntEvent");
        this.graph.addEdge(new BpmnEdge(this.edge_idx, task2, eventInt));

        //Intermediate Event --> JOIN_AND gateway
        let gatewayJoinAnd = this.createNode(new BpmnGatewayJoinAnd("AndJoin"), "AndJoin");
        this.graph.addEdge(new BpmnEdge(this.edge_idx, eventInt, gatewayJoinAnd));

        //Task3 --> JOIN_AND gateway
        this.graph.addEdge(new BpmnEdge(this.edge_idx, task3, gatewayJoinAnd));

        //SPLIT_AND gateway --> IntermediateEvent2
        let eventInt2 = this.createNode(new BpmnEventIntermediate("IntEvent2"), "IntEvent");
        this.graph.addEdge(new BpmnEdge(this.edge_idx, gatewaySplitAnd, eventInt2));

        //IntermediateEvent2 --> task4
        let task4 = this.createNode(new BpmnTaskBusinessRule("BRTask"), "BusinessRule");
        this.graph.addEdge(new BpmnEdge(this.edge_idx, eventInt2, task4));

        //task4 --> JOIN_AND gateway
        this.graph.addEdge(new BpmnEdge(this.edge_idx, task4, gatewayJoinAnd));

        //JOIN_AND gateway --> task5
        let task5 = this.createNode(new BpmnTaskReceiving("RecTask"), "ReceivingTask");
        this.graph.addEdge(new BpmnEdge(this.edge_idx, gatewayJoinAnd, task5));

        //task5 --> EndEvent
        let endEvent = this.createNode(new BpmnEventEnd("EndEv"), "End");
        this.graph.addEdge(new BpmnEdge(this.edge_idx, task5, endEvent));

    }
    static create(): BpmnGraph {

        return new AndGraphThreeLevelsWithEvents().graph
    }
}

