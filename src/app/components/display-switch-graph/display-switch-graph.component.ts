import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { BpmnGraph } from 'src/app/classes/Basic/Bpmn/BpmnGraph';
import { SwitchableGraph } from 'src/app/classes/Basic/Switch/SwitchableGraph';
import { DisplayService } from 'src/app/services/display.service';
import { LayoutService } from 'src/app/services/layout.service';
import { SvgService } from 'src/app/services/svg.service';

@Component({
  selector: 'app-display-switch-graph',
  templateUrl: './display-switch-graph.component.html',
  styleUrls: ['./display-switch-graph.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DisplaySwitchGraphComponent implements OnDestroy, AfterViewInit {
  @ViewChild('drawingArea') drawingArea: ElementRef<SVGElement> | undefined;
  @ViewChild('rootSvg') rootSvg: ElementRef<SVGElement> | undefined;

  private _sub: Subscription | undefined;
  private bpmnGraph: BpmnGraph | undefined;

  constructor(
    private _layoutService: LayoutService,
    private _svgService: SvgService,
    private _displayService: DisplayService
  ) { }

  ngAfterViewInit(): void {
    this._sub = this._displayService.diagram$.subscribe((graph) => {
      if (graph == undefined) return
      if (graph.isEmpty()) return
      if (this.rootSvg == undefined || this.drawingArea == undefined) return
      this.bpmnGraph = graph;
      if (!this._layoutService.initalLayoutHasBeenDone) {
        this._layoutService.layout(
          this.bpmnGraph,
          this.rootSvg!.nativeElement.clientWidth,
          this.rootSvg!.nativeElement.clientHeight
        );
      }

      this._layoutService.setViewBox(this.drawingArea.nativeElement)

      const switchGraph = new SwitchableGraph(graph);

      this.draw(switchGraph.svgManager.getSvg())


    });
  }



  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._sub?.unsubscribe();
  }

  private draw(svg: SVGElement) {
    if (this.drawingArea === undefined) {
      console.debug('drawing area not ready yet');
      return;
    }
    this.clearDrawingArea();
    this.drawingArea.nativeElement.appendChild(svg);
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