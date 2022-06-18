import { Component, ElementRef, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { DisplayService } from '../../services/display.service';
import { Subscription } from 'rxjs';
import { LayoutService } from '../../services/layout.service';
import { SvgService } from '../../services/svg.service';
import { BpmnGraph } from 'src/app/classes/Basic/Bpmn/BpmnGraph';
import { DragWrapperGraph } from 'src/app/classes/Basic/Drag/DragWrapperGraph';

@Component({
    selector: 'app-display',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class DisplayComponent implements OnDestroy {

    @ViewChild('drawingArea') drawingArea: ElementRef<SVGElement> | undefined;

    private _sub: Subscription;
    private _diagram: BpmnGraph | undefined;

    constructor(private _layoutService: LayoutService,
        private _svgService: SvgService,
        private _displayService: DisplayService) {

        this._sub = this._displayService.diagram$.subscribe(diagram => {
            this._diagram = diagram;
            if( this.drawingArea != undefined){
                const width = this.drawingArea.nativeElement.clientWidth;
                const height = this.drawingArea.nativeElement.clientHeight;
                this._layoutService.layout(this._diagram,width, height);
            }
            
            //this.draw(this._diagram.createDiagramSVG());
            //const g = BpmnGraph.sampleGraph()
            const dg = new DragWrapperGraph(diagram)
            this.draw(dg.updateSvg());

        });
    }

    ngOnDestroy(): void {
        this._sub.unsubscribe();
    }

    private draw(svg:SVGElement) {
        if (this.drawingArea === undefined) {
            console.debug('drawing area not ready yet')
            return;
        }
        console.log("draw is called")

        this.clearDrawingArea();

        this.drawingArea.nativeElement.appendChild(svg)
        
        /*
        const elements = this._svgService.createSvgElements(this._displayService.diagram);
        for (const element of elements) {
            this.drawingArea.nativeElement.appendChild(element);
        }
        */
        
        

        
       /*const el1 = new Gateway("1", GatewayType.AND_JOIN)
       const el2 = new MyElement("2")

       this.drawingArea.nativeElement.appendChild(el1.getSVGThatWillBeAttachedToDom())
       this.drawingArea.nativeElement.appendChild(el2.getSvgWithListeners())
        */
        
    }

    private clearDrawingArea() {
        const drawingArea = this.drawingArea?.nativeElement;
        if (drawingArea?.childElementCount === undefined) {
            return;
        }

        while (drawingArea.childElementCount > 0) {
            drawingArea.removeChild(drawingArea.lastChild as ChildNode);
        }
    }

}
