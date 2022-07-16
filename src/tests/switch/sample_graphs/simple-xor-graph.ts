import { BpmnEdge } from "src/app/classes/Basic/Bpmn/BpmnEdge/BpmnEdge";
import { BpmnGraph } from "src/app/classes/Basic/Bpmn/BpmnGraph";
import { BpmnEventEnd } from "src/app/classes/Basic/Bpmn/events/BpmnEventEnd";
import { BpmnEventStart } from "src/app/classes/Basic/Bpmn/events/BpmnEventStart";
import { BpmnGatewayJoinOr } from "src/app/classes/Basic/Bpmn/gateways/BpmnGatewayJoinOr";
import { BpmnGatewayJoinXor } from "src/app/classes/Basic/Bpmn/gateways/BpmnGatewayJoinXor";
import { BpmnGatewaySplitOr } from "src/app/classes/Basic/Bpmn/gateways/BpmnGatewaySplitOr";
import { BpmnGatewaySplitXor } from "src/app/classes/Basic/Bpmn/gateways/BpmnGatewaySplitXor";
import { BpmnTaskManual } from "src/app/classes/Basic/Bpmn/tasks/BpmnTaskManual";
import { BpmnTaskService } from "src/app/classes/Basic/Bpmn/tasks/BpmnTaskService";
import { BpmnTaskUserTask } from "src/app/classes/Basic/Bpmn/tasks/BpmnTaskUserTask";
import { TestGraph } from "./TestGraph";

export class SimpleXorGraph extends TestGraph{

    constructor(){
        super()
         //startEvent --> Task1
         let startEvent = this.createNode(new BpmnEventStart("StartEv"), "StartEv");
         let task1 = this.createNode(new BpmnTaskService("Task1"), "ServiceTask");
         this.graph.addEdge(new BpmnEdge(this.edge_idx,startEvent, task1));
 
         //Task1 --> SPLIT_XOR gateway
         let gatewaySplitXor = this.createNode(new BpmnGatewaySplitXor("XOR-Split"), "XOR-Split");
         this.graph.addEdge(new BpmnEdge(this.edge_idx, task1, gatewaySplitXor));
       
 
         //SPLIT_XOR gateway --> Task2
         let task2 = this.createNode(new BpmnTaskManual("Task2"), "ManualTask");
         this.graph.addEdge(new BpmnEdge(this.edge_idx, gatewaySplitXor, task2));
 
         //SPLIT_XOR gateway --> Task3
         let task3 = this.createNode(new BpmnTaskUserTask("Task3"), "UserTask");
         this.graph.addEdge(new BpmnEdge(this.edge_idx, gatewaySplitXor, task3));
 
         //Task2 --> JOIN_XOR gateway
         let gatewayJoinXor = this.createNode(new BpmnGatewayJoinXor("XOR-Join"), "XOR-Join");
         this.graph.addEdge(new BpmnEdge(this.edge_idx, task2, gatewayJoinXor));
 
         //Task3 --> JOIN_XOR gateway
         this.graph.addEdge(new BpmnEdge(this.edge_idx, task3, gatewayJoinXor));
 
         //JOIN_XOR gateway --> EndEvent
         let endEvent = this.createNode(new BpmnEventEnd("EndEv"), "End");
         this.graph.addEdge(new BpmnEdge(this.edge_idx, gatewayJoinXor, endEvent));

    }
   static create():BpmnGraph{     
    
        return new SimpleXorGraph().graph
    }
}

