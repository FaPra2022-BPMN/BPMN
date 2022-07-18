import { BpmnEdge } from "src/app/classes/Basic/Bpmn/BpmnEdge/BpmnEdge";
import { BpmnGraph } from "src/app/classes/Basic/Bpmn/BpmnGraph";
import { BpmnEventEnd } from "src/app/classes/Basic/Bpmn/events/BpmnEventEnd";
import { BpmnEventStart } from "src/app/classes/Basic/Bpmn/events/BpmnEventStart";
import { BpmnTaskService } from "src/app/classes/Basic/Bpmn/tasks/BpmnTaskService";
import { TestGraph } from "./TestGraph";

export class SimpleGraphNoGateways extends TestGraph{

    constructor(){
        super()
         //startEvent --> Task1
         let startEvent = this.createStartEvent();
         let task1 = this.createServiceTask();
         this.createEdge(startEvent, task1);
 
        
        //Task1 --> EndEvent
         let endEvent = this.createEndEvent();
         this.createEdge(task1, endEvent);

    }
   static create():BpmnGraph{     
    
        return new SimpleGraphNoGateways().graph
    }
}

