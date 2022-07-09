import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DisplayErrorService} from "../../services/display-error.service";
import { FormValidationService } from 'src/app/services/form-validation.service';

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
            private formValidationService: FormValidationService) {
    }

    showMenu() {
        console.log(document.getElementById("myDropdown"));
        document.getElementById("myDropdown")?.classList.toggle("show");
    }

    download(type:string) {
        let textToExport = this.text;
        //ist der type pn oder bpmn-xml, wird textToExport zu dem jeweiligen Format geändert 
        if(textToExport) {
            if(!this.formValidationService.validateFormat(textToExport)){
                this.displayErrorService.displayError("BPMN-Format ist verletzt; nicht exportierbar");
            }else {
            let a = document.getElementById(type);
            if(a) {
                a.setAttribute('href','data:text/plain;charset=utf-8, ' + encodeURIComponent(textToExport));
                a.setAttribute('download', type + ".txt");
            }
            }
        }
    }
}