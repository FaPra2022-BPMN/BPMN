import { Component, Input } from '@angular/core';
import { BpmnGraph } from 'src/app/classes/Basic/Bpmn/BpmnGraph';
import { Validator } from 'src/app/classes/Basic/Bpmn/BpmnGraphValidator';
import { Petrinet } from 'src/app/classes/Petrinet/petrinet';
import { XmlExporter } from 'src/app/classes/XmlExport/xml-export';
import { DisplayService } from 'src/app/services/display.service';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { DisplayErrorService } from "../../services/display-error.service";

@Component({
    selector: 'output-field',
    templateUrl: './output-field.component.html',
    styleUrls: ['./output-field.component.scss']
})
export class OutputFieldComponent {

    @Input() buttonText: string | undefined;
    @Input() buttonIcon: string | undefined;
    @Input() text: string | undefined;

    private NO_GRAPH_ERR = "Kein BPMN Graph!"
    private SOMETHING_WENT_WRONG = "Problem bei Konvertierung: "

    constructor(private displayErrorService: DisplayErrorService,
        private formValidationService: FormValidationService,
        private displayService: DisplayService) {
    }

    showMenu() {
        document.getElementById("myDropdown")?.classList.toggle("show");
    }

    download(type: string) {
        this.resetButton(type)
        let textToExport = null;
        let filetype = '.txt';
        switch (type) {
            case 'bpmn': {

                textToExport = this.text;
                if (textToExport) {
                    if (!this.formValidationService.validateFormat(textToExport)) {
                        this.displayErrorService.displayError("BPMN-Format ist verletzt; nicht exportierbar");
                        return;
                    }

                };
                break;
            }
            case 'bpmn-xml': {
                filetype = ".bpmn";

                //error message and abort if graph is null
                let graph = this.getGraph()
                if (!graph)
                    return

                //valid graph
                let result = XmlExporter.exportBpmnAsXml(graph);

                if (result.xmlText)
                    textToExport = result.xmlText
                else
                    textToExport = result.error
                console.error(result.error)
                break;
            }

            case 'pn': {

                //error message and abort if graph is null
                let graph = this.getGraph()
                if (!graph)
                    return

                //valid graph
                let result = new Petrinet(graph.nodes).print();
                if (!result.valid) {
                    this.displayErrorService.displayError(this.SOMETHING_WENT_WRONG + ": " + result.errors)
                    return
                }
                textToExport = result.pnText
                break;
            }
        }


        let a = document.getElementById(type);
        if (a && textToExport) {
            a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(textToExport));
            a.setAttribute('download', type + filetype);

        }



    }
    private resetButton(type: string) {
        let a = document.getElementById(type);
        if (a) {
            if (a.getAttribute('href'))
                a.removeAttribute('href')

            if (a.getAttribute('download'))
                a.removeAttribute('download');
        }
    }
    private getGraph(): BpmnGraph | null {
        let graph = this.displayService.diagram;
        //no graph
        if (!graph) {
            this.displayErrorService.displayError(this.NO_GRAPH_ERR)
            return null
        }

        return graph
    }

}