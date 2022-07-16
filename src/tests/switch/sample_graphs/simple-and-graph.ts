import { BpmnEdge } from "src/app/classes/Basic/Bpmn/BpmnEdge/BpmnEdge";
import { BpmnGraph } from "src/app/classes/Basic/Bpmn/BpmnGraph";
import { BpmnEventEnd } from "src/app/classes/Basic/Bpmn/events/BpmnEventEnd";
import { BpmnEventStart } from "src/app/classes/Basic/Bpmn/events/BpmnEventStart";
import { BpmnGatewayJoinAnd } from "src/app/classes/Basic/Bpmn/gateways/BpmnGatewayJoinAnd";
import { BpmnGatewaySplitAnd } from "src/app/classes/Basic/Bpmn/gateways/BpmnGatewaySplitAnd";
import { BpmnTaskManual } from "src/app/classes/Basic/Bpmn/tasks/BpmnTaskManual";
import { BpmnTaskService } from "src/app/classes/Basic/Bpmn/tasks/BpmnTaskService";
import { BpmnTaskUserTask } from "src/app/classes/Basic/Bpmn/tasks/BpmnTaskUserTask";
import { TestGraph } from "./TestGraph";

export class SimpleAndGraph extends TestGraph{

    constructor(){
        super()
         //startEvent --> Task1
         let startEvent = this.createNode(new BpmnEventStart("StartEv"), "Start");
         let task1 = this.createNode(new BpmnTaskService("Task1"), "ServiceTask");
         this.graph.addEdge(new BpmnEdge("1",startEvent, task1));
 
         //Task1 --> SPLIT_AND gateway
         let gatewaySplitAnd1 = this.createNode(new BpmnGatewaySplitAnd("AndSplit"), "AndSplit");
         this.graph.addEdge(new BpmnEdge("2", task1, gatewaySplitAnd1));
       
 
         //SPLIT_AND gateway --> Task2
         let task2 = this.createNode(new BpmnTaskManual("Task2"), "ManualTask");
         this.graph.addEdge(new BpmnEdge("3", gatewaySplitAnd1, task2));
 
         //SPLIT_AND gateway --> Task3
         let task3 = this.createNode(new BpmnTaskUserTask("Task3"), "UserTask");
         this.graph.addEdge(new BpmnEdge("4", gatewaySplitAnd1, task3));
 
         //Task2 --> JOIN_AND gateway
         let gatewayJoinAnd = this.createNode(new BpmnGatewayJoinAnd("JoinAnd"), "JoinAnd");
         this.graph.addEdge(new BpmnEdge("5", task2, gatewayJoinAnd));
 
         //Task3 --> JOIN_AND gateway
         this.graph.addEdge(new BpmnEdge("6", task3, gatewayJoinAnd));
 
         //JOIN_OR gateway --> EndEvent
         let endEvent = this.createNode(new BpmnEventEnd("EndEv"), "End");
         this.graph.addEdge(new BpmnEdge("7", gatewayJoinAnd, endEvent));

    }
   static create():BpmnGraph{     
    
        return new SimpleAndGraph().graph
    }
}

