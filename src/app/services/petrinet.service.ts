import { Injectable } from '@angular/core';
import { BpmnGraph } from '../classes/Basic/Bpmn/BpmnGraph';
import { Petrinet } from '../classes/Petrinet/petrinet';


@Injectable({
  providedIn: 'root'
})
export class PetrinetService {


  public convert(diagram: BpmnGraph): string {
    let petri: Petrinet = new Petrinet();

    for (let bpmnNode of diagram.nodes) 
      petri.addNodes(bpmnNode);

    return petri.print();
  }

}
