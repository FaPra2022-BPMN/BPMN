import { DisplayErrorService } from "./display-error.service";
import {Injectable} from '@angular/core';


@Injectable({
    providedIn: 'root'
})

export class FormValidationService {

    constructor(private displayErrorService: DisplayErrorService){

    }

    validateFormat(input: string): boolean {
        if (input.includes(".tasks")){
            if (!this.validateCategory("tasks", input)) {
                return false;
            }
        }
        if(input.includes(".edges")){
            if (!this.validateCategory("edges", input)) {
                return false;
            }
        }
        if (input.includes(".events")) {
            if (!this.validateCategory("events", input)) {
                return false;
                }
            }
        if (input.includes(".gateways")) {
            if (!this.validateCategory("gateways", input)) {
                return false;
                }
            }
        return true;
    }

    private validateCategory(category: string, input: string): boolean {
        let regexp: RegExp;
        switch (category) {

            case "tasks": regexp = /^[\w]+( "[\w ]*")? (Sending|Manual|Service|BusinessRule|Receiving|UserTask)?(?: \([0-9]*,[0-9]*\))?/i; break;
            case "edges": regexp = /^[\w]+ [\w]+( "[\w ]*")? (SequenceFlow|Association|DefaultFlow)(?: \([0-9]*,[0-9]*\))?/i; break;
            case "events": regexp = /^[\w]+( "[\w ]*")? (Start|End|Intermediate)(?: \([0-9]*,[0-9]*\))?/i; break;
            case "gateways": regexp = /^[\w]+( "[\w ]*")? (XOR_SPLIT|XOR_JOIN|AND_SPLIT|AND_JOIN|OR_SPLIT|OR_JOIN)(?: \([0-9]*,[0-9]*\))?/i; break;
            default: return false;
        }

        const lines = input.split('\n');
        let pos;
        let cat = lines.find(el => el.startsWith("." + category));
        if(!cat) {
            console.log("error: no" + category);
        } else {
            pos = lines.indexOf(cat)+1;
            while(pos < lines.length && lines[pos].match(/^\w/) !== null) {
                let match = lines[pos].match(regexp);
                if (match === null) {
                    console.log("format error at " + category);
                    return false;
                }
                pos++;
            }
        }
        console.log(category + " validated");
        return true;
        }

    }
