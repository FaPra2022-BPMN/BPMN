import { Injectable } from '@angular/core';
import { Diagram } from '../classes/diagram/diagram';
import { Element } from '../classes/diagram/element';
import { Gateway } from '../classes/diagram/elements/gateway';
import { Event } from '../classes/diagram/elements/event';

import { EventType } from '../classes/diagram/elements/eventtype';
import { GatewayType } from '../classes/diagram/elements/gatewaytype';
import { Task } from '../classes/diagram/elements/task';
import { TaskType } from '../classes/diagram/elements/tasktype';
import { Arrow } from '../classes/diagram/elements/arrow/Arrow';
import { SwitchController } from '../classes/diagram/elements/switch-controller';
import { Connector } from '../classes/diagram/elements/connector';
import { Connectortype } from '../classes/diagram/elements/connectortype';

@Injectable({
    providedIn: 'root'
})
export class ParserService {

    constructor() {
    }

    parse(text: string): Diagram | undefined {
        const lines = text.split('\n');

        // const result = new Diagram();
        //
        // lines.forEach(line => {
        //     if (line.trimEnd().length > 0) {
        //         result.addElement(this.parseElement(line));
        //     }
        // });
         const result = this.testDiagrammSchalten1();
        //const result = this.testDiagramm();
        const controller = new SwitchController(result);

        return result;
    }



    private parseElement(line: string): Element {
        //return new Task("t1","Hotel buchen", TaskType.Service);
        // return new Gateway("G1",GatewayType.AND_JOIN); // XOR_JOIN OR_JOIN AND_JOIN
        return new Event("E1", "Test", EventType.Intermediate);  // Start, End, Intermediate
        // return new Task("t1","Hotel buchen", TaskType.UserTask);  //Sending, Manual, Service, BusinessRule, Receiving, UserTask};
    }


    private testDiagramm(): Diagram {
        const result = new Diagram();
        let elementE1 = new Event("E1", "Start", EventType.Start);
        elementE1.x = 60;
        elementE1.y = 190;
        result.addElement(elementE1);

        let elementE2 = new Event("E2", "", EventType.Intermediate);
        elementE2.x = 850;
        elementE2.y = 190;
        result.addElement(elementE2);



        let elementE3 = new Event("E3", "Ende", EventType.End);
        elementE3.x = 1600;
        elementE3.y = 190;
        result.addElement(elementE3);

        let elementT1 = new Task("t1", "Hotel buchen", TaskType.Service);
        elementT1.x = 442;
        elementT1.y = 60;
        result.addElement(elementT1);

        let elementT2 = new Task("t2", "Flug buchen", TaskType.Manual);
        elementT2.x = 442;
        elementT2.y = 320;
        result.addElement(elementT2);

        let elLamborgini = new Task("tLambo", "Lamborghini buchen", TaskType.Manual);
        elLamborgini.x = 0;
        elLamborgini.y = 0;
        result.addElement(elLamborgini);



        let elementT3 = new Task("t3", "Drucken", TaskType.UserTask);
        elementT3.x = 1225;
        elementT3.y = 190;
        result.addElement(elementT3);

        let elementG1 = new Gateway("G1", GatewayType.AND_SPLIT);
        elementG1.x = 210;
        elementG1.y = 190;
        result.addElement(elementG1);

        let elementG2 = new Gateway("G2", GatewayType.AND_SPLIT);
        elementG2.x = 675;
        elementG2.y = 190;
        result.addElement(elementG2);

        let connector = new Arrow("p1", "", elementE1, elementG1);
        result.addEdge(elementE1, elementG1);
        result.addElement(connector);

        let pfeil = new Arrow("p2", "label", elementG1, elementT1);
        result.addEdge(elementG1, elementT1);
        result.addElement(pfeil);

        let connector2: Arrow = new Arrow("p3", "", elementG1, elementT2);
        connector2.addArrowCorner(210, 320);

        result.addEdge(elementG1, elementT2);
        result.addElement(connector2);

        let connector3: Arrow = new Arrow("A4", "", elementT1, elementG2);
        connector3.addArrowCorner(675, 60);
        result.addEdge(elementT1, elementG2);
        result.addElement(connector3);

        let connector4 = new Arrow("A5", "", elementT2, elementG2);
        connector4.addArrowCorner(675, 320);
        result.addEdge(elementT2, elementG2);
        result.addElement(connector4);

        let connector5 = new Arrow("A6", "", elementG2, elementE2);
        result.addEdge(elementG2, elementE2);
        result.addElement(connector5)

        let connector6 = new Arrow("A7", "", elementE2, elementT3);
        result.addEdge(elementE2, elementT3);
        result.addElement(connector6)

        let connector7 = new Arrow("A8", "", elementT3, elementE3);
        result.addEdge(elementT3, elementE3);
        result.addElement(connector7)

        let connector8 = new Arrow("A9", "", elementE3, elementE2);
        connector8.addArrowCorner(1600, 60);
        connector8.addArrowCorner(850, 60);
        result.addEdge(elementE3, elementE2);
        result.addElement(connector8);


        let pp = new Arrow("pLamboEin", "", elementG1, elLamborgini);
        result.addEdge(elementG1, elLamborgini);
        result.addElement(pp);

        let ppp = new Arrow("pLamboAus", "", elLamborgini, elementG2);
        result.addEdge(elLamborgini, elementG2);
        result.addElement(ppp);

        return result;
    }

    private testDiagramm2(): Diagram {
        var result = new Diagram();
        let elementE1 = new Event("E1", "Start", EventType.Start);
        result.addElement(elementE1);

        let elementE2 = new Event("E2", "", EventType.Intermediate);
        result.addElement(elementE2);

        let elementT1 = new Task("t1", "Hotel buchen", TaskType.Service);
        result.addElement(elementT1);

        let elementT2 = new Task("t2", "Flug buchen", TaskType.Manual);
        result.addElement(elementT2);

        let elementT3 = new Task("t3", "t3", TaskType.Manual);
        result.addElement(elementT3);
        let connector4: Connector = new Connector("A4", "", Connectortype.InformationFlow, elementE2, elementT3);
        result.addEdge(elementE2, elementT3);
        result.addElement(connector4);


        let elementT4 = new Task("t4", "t4", TaskType.Manual);
        result.addElement(elementT4);
        let connector5: Connector = new Connector("A4", "", Connectortype.InformationFlow, elementT3, elementT4);
        result.addEdge(elementT3, elementT4);
        result.addElement(connector5);


        // let elementT5 = new Task("t5", "t5", TaskType.Manual);
        // result.addElement(elementT5);
        // let connector6: Connector = new Connector("A4", "", Connectortype.InformationFlow, elementT4, elementT5);
        // result.addEdge(elementT4, elementT5);
        // result.addElement(connector6);


        // let elementT6 = new Task("t6", "t6", TaskType.Manual);
        // result.addElement(elementT6);
        // let connector7: Connector = new Connector("A4", "", Connectortype.InformationFlow, elementT5, elementT6);
        // result.addEdge(elementT5, elementT6);
        // result.addElement(connector7);


        // let elementT7 = new Task("t7", "t7", TaskType.Manual);
        // result.addElement(elementT7);
        // let connector8: Connector = new Connector("A4", "", Connectortype.InformationFlow, elementT6, elementT7);
        // result.addEdge(elementT6, elementT7);
        // result.addElement(connector8);

        let connector: Connector = new Connector("A1", "", Connectortype.InformationFlow, elementE1, elementT1);
        result.addEdge(elementE1, elementT1);
        result.addElement(connector);

        let connector1: Connector = new Connector("A1", "", Connectortype.InformationFlow, elementE1, elementT2);
        result.addEdge(elementE1, elementT2);
        result.addElement(connector1);

        let connector2: Connector = new Connector("A1", "", Connectortype.InformationFlow, elementT1, elementE2);
        result.addEdge(elementT1, elementE2);
        result.addElement(connector2);

        let connector3: Connector = new Connector("A1", "", Connectortype.InformationFlow, elementT2, elementE2);
        result.addEdge(elementT2, elementE2);
        result.addElement(connector3);
        return result;
    }



    private testDiagrammSchaltung(): Diagram {
        // Probleme bei der Darstellung von Elementen, welche über keine Kanten verfügen
        var result = new Diagram();


        let elementE1 = new Event("E1", "Start", EventType.Start);
        result.addElement(elementE1);

        let elementE2 = new Event("E2", "Start2", EventType.Start);
        result.addElement(elementE2);

        //  let elementE3 = new Event("E3", "Start3", EventType.Start);
        //  result.addElement(elementE3);

        let elementG1 = new Gateway("G1", GatewayType.OR_SPLIT);
        result.addElement(elementG1);
        let elementG3 = new Gateway("G3", GatewayType.OR_SPLIT);
        result.addElement(elementG3);

        let connector1: Connector = new Connector("A1", "", Connectortype.InformationFlow, elementE1, elementG1);
        result.addEdge(elementE1, elementG1);
        result.addElement(connector1);

        let connector2: Connector = new Connector("A2", "", Connectortype.InformationFlow, elementE2, elementG1);
        result.addEdge(elementE2, elementG1);
        result.addElement(connector2);











        // let connector3: Connector = new Connector("A3", "", Connectortype.InformationFlow, elementE3, elementT1);
        // result.addEdge(elementE3, elementT1);
        // result.addElement(connector3);



        let elementG2 = new Gateway("G2", GatewayType.XOR_JOIN);
        result.addElement(elementG2);

        let elementG4 = new Gateway("G4", GatewayType.XOR_JOIN);
        result.addElement(elementG4);

        let elementT1 = new Task("T1", "Ende", TaskType.BusinessRule);
        result.addElement(elementT1);


        let connector3: Connector = new Connector("A3", "", Connectortype.InformationFlow, elementG1, elementG2);
        result.addEdge(elementE2, elementG2);
        result.addElement(connector3);

        // //_-_

        // let elementE20 = new Event("E20", "E20", EventType.Intermediate);
        //         result.addElement(elementE20);
        // //_-_




        let connector4: Connector = new Connector("A4", "", Connectortype.InformationFlow, elementG1, elementT1);
        result.addEdge(elementG1, elementT1);
        result.addElement(connector4);


        let elementT2 = new Task("T2", "T2", TaskType.BusinessRule);
        result.addElement(elementT2);


        let elementT3 = new Task("T3", "T3", TaskType.BusinessRule);
        result.addElement(elementT3);

        let connector5: Connector = new Connector("A5", "", Connectortype.InformationFlow, elementG2, elementT2);
        result.addEdge(elementE2, elementT2);
        result.addElement(connector5);

        let connector6: Connector = new Connector("A6", "", Connectortype.InformationFlow, elementG2, elementT3);
        result.addEdge(elementG1, elementT3);
        result.addElement(connector6);


        let connector7: Connector = new Connector("A7", "", Connectortype.InformationFlow, elementT2, elementG4);
        result.addEdge(elementT2, elementG4);
        result.addElement(connector7);

        let connector8: Connector = new Connector("A8", "", Connectortype.InformationFlow, elementT3, elementG4);
        result.addEdge(elementT3, elementG4);
        result.addElement(connector8);

        let connector9: Connector = new Connector("A9", "", Connectortype.InformationFlow, elementT1, elementG3);
        result.addEdge(elementT1, elementG3);
        result.addElement(connector9);

        let connector10: Connector = new Connector("A10", "", Connectortype.InformationFlow, elementG4, elementG3);
        result.addEdge(elementG4, elementG3);
        result.addElement(connector10);


        // let elementE63 = new Event("E3", "Ende", EventType.End);
        // result.addElement(elementE3);

        // let elementT31 = new Task("t1", "Hotel suchen", TaskType.Service);
        // result.addElement(elementT1);


        // let elementG11 = new Gateway("G1", GatewayType.OR_SPLIT);
        // result.addElement(elementG1);

        // let elementG2 = new Gateway("G2", GatewayType.OR_JOIN);
        // result.addElement(elementG2);

        // let connector334: Connector = new Connector("A1", "", Connectortype.InformationFlow, elementE1, elementG1);
        // result.addEdge(elementE1, elementG1);
        // result.addElement(connector);










        return result;
    }





    private testDiagrammSchalten1(): Diagram {
        var result = new Diagram();

        // Events 
        let e1 = new Event("e1", "Start 1", EventType.Start);
        result.addElement(e1);

        let e2 = new Event("e2", "Start 2", EventType.Start);
        result.addElement(e2);

        let e3 = new Event("e3", "thisIsTheEnd", EventType.End);
        result.addElement(e3);

        // Gateway
        let g1 = new Gateway("g1", GatewayType.XOR_JOIN);
        result.addElement(g1);

        let g2S = new Gateway("g2S", GatewayType.OR_SPLIT);
        result.addElement(g2S);

        let g2J = new Gateway("g2J", GatewayType.OR_JOIN);
        result.addElement(g2J);

        let g3S = new Gateway("g3S", GatewayType.XOR_SPLIT);
        result.addElement(g3S);

        let g3J = new Gateway("g3J", GatewayType.XOR_JOIN);
        result.addElement(g3J);

        // Task
        let t1 = new Task("t1", "t1", TaskType.Service);
        result.addElement(t1);

        let t2 = new Task("t2", "t2", TaskType.Manual);
        result.addElement(t2);

        let t3 = new Task("t3", "t3", TaskType.Receiving);
        result.addElement(t3);

        let t4 = new Task("t4", "t4", TaskType.UserTask);
        result.addElement(t4);

        let t5 = new Task("t5", "t5", TaskType.Sending);
        result.addElement(t5);

        let t6 = new Task("t6", "t6", TaskType.BusinessRule);
        result.addElement(t6);

        let t7 = new Task("t7", "t7", TaskType.Manual);
        result.addElement(t7);

        let t8 = new Task("t8", "t8", TaskType.Receiving);
        result.addElement(t8);

        let t9 = new Task("t9", "t9", TaskType.Sending);
        result.addElement(t9);

        // Arrow
        let p1 = new Arrow("p1", "", e1, t1);
       // result.addEdge(e1, t1);
        result.addElement(p1);

        let p2 = new Arrow("p2", "", e2, t2);
       // result.addEdge(e2, t2);
        result.addElement(p2);

        let p3 = new Arrow("p3", "", t1, g1);
       // result.addEdge(t1, g1);
        result.addElement(p3);

        let p4 = new Arrow("p4", "", t2, g1);
       // result.addEdge(t2, g1);
        result.addElement(p4);







        let p5 = new Arrow("p5", "", g1, t3);
       // result.addEdge(g1, t3);
        result.addElement(p5);

        let p6 = new Arrow("p6", "", t3, g2S);
       // result.addEdge(t3, g2S);
        result.addElement(p6);

        let p7 = new Arrow("p7", "", g2S, t4);
      //  result.addEdge(g2S, t4);
        result.addElement(p7);





       
    // ================================================ Alternative Start

    //     let p8 = new Arrow("p8", "", g2S, g3S);
    //   //  result.addEdge(g2S, g3S);
    //     result.addElement(p8);


    // ================================================ Alternative ODER
    let t10 = new Task("t10", "t10", TaskType.Service);
    result.addElement(t10);
    let p99 = new Arrow("p99", "", g2S, t10);
    result.addElement(p99);
    let p100 = new Arrow("p100", "", t10, g3S);
    result.addElement(p100);

    // ================================================ Alternative Ende


        let p9 = new Arrow("p9", "", g3S, t6);
      //  result.addEdge(g3S, t6);
        result.addElement(p9);

        let p10 = new Arrow("p10", "", g3S, t8);
       // result.addEdge(g3S, t8);
        result.addElement(p10);

        let p11 = new Arrow("p11", "", t4, t5);
      //  result.addEdge(t4, t5);
        result.addElement(p11);

        let p12 = new Arrow("p12", "", t6, t7);
       // result.addEdge(t6, t7);
        result.addElement(p12);






        let p13 = new Arrow("p13", "", t8, t9);
      //  result.addEdge(t8, t9);
        result.addElement(p13);

        let p14 = new Arrow("p14", "", t7, g3J);
       // result.addEdge(t7, g3J);
        result.addElement(p14);

        let p15 = new Arrow("p15", "", t9, g3J);
       // result.addEdge(t9, g3J);
        result.addElement(p15);

        let p16 = new Arrow("p16", "", t5, g2J);
       // result.addEdge(t5, g2J);
        result.addElement(p16);






        let p17 = new Arrow("p17", "", g3J, g2J);
        //result.addEdge(g3J, g2J);
        result.addElement(p17);

        let p18 = new Arrow("p18", "", g2J, e3);
        //result.addEdge(g2J, e3);
        result.addElement(p18);




        // let connector4: Connector = new Connector("A4", "", Connectortype.InformationFlow, elementE2, elementT3);
        // result.addEdge(elementE2, elementT3);
        // result.addElement(connector4);


        return result;
    }
}
