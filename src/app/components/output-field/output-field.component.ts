import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DisplayErrorService} from "../../services/display-error.service";
import { FormValidationService } from 'src/app/services/form-validation.service';
import { ParserService } from 'src/app/services/parser.service';
import { GraphValidationService } from 'src/app/services/graph-validation.service';
import { PetrinetService } from 'src/app/services/petrinet.service';

@Component({
    selector: 'output-field',
    templateUrl: './output-field.component.html',
    styleUrls: ['./output-field.component.scss']
})
export class OutputFieldComponent {

    @Input() buttonText: string | undefined;
    @Input() buttonIcon: string | undefined;
    @Input() text: string | undefined;

    constructor(private displayErrorService: DisplayErrorService, 
            private formValidationService: FormValidationService,
            private parserService: ParserService,
            private graphValidationService: GraphValidationService,
            private petrinetService: PetrinetService) {
    }

    showMenu() {
        document.getElementById("myDropdown")?.classList.toggle("show");
    }

    download(type:string) {
        let textToExport = this.text;
        let filetype = '.txt';
        switch(type) {
            case'bpmn': if(textToExport) {
                if(!this.formValidationService.validateFormat(textToExport)){
                    this.displayErrorService.displayError("BPMN-Format ist verletzt; nicht exportierbar");
                    return;
                }
            }; break;
            case 'bpmn-xml':{
                filetype = ".xml";
                this.displayErrorService.displayError("XML-Format wird noch implementiert");
                //todo: textToExport zu XML-Format konvertieren; return entfernen
                return;
            }
                case 'pn': {
    
                    //get BPMN Graph
                    let graph = this.parserService.parse(this.text || "")
                    if (!graph) {
                        this.displayErrorService.displayError("Failed to parse field content and create BPMN graph");
                        return
                    }
    
                    //validate BPMN
                    let valid: boolean = this.graphValidationService.validateGraph(graph);
                    if (!valid)
                        return
                        
                    
                    //convert to petri net
                    textToExport = this.petrinetService.convert(graph);
    
                    if (!textToExport || textToExport?.startsWith("ERR")) {
                        this.displayErrorService.displayError("Something went wrong! " + textToExport);
                        return
                    }
    
                    break;
                }
        }

        
        let a = document.getElementById(type);
            if(a && textToExport) {
                a.setAttribute('href','data:text/plain;charset=utf-8,' + encodeURIComponent(textToExport));
                a.setAttribute('download', type + filetype);
            }
            }
    }