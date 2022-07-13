import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ParserService } from './services/parser.service';
import { DisplayService } from './services/display.service';
import { debounceTime, Subscription } from 'rxjs';
import { BpmnGraph } from './classes/Basic/Bpmn/BpmnGraph';
import { PetrinetService } from './services/petrinet.service';




@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {

    mode = "free dragging"
    public textareaFc: FormControl;
    private _sub: Subscription;
    public petritext: string = "";
    diagrams: Array<string> = ["default", "AND", "XOR", "OR"];


    constructor(
        private _parserService: ParserService,
        private _displayService: DisplayService,
        private _petrinetService: PetrinetService
    ) {
        this.textareaFc = new FormControl();
        this._sub = this.textareaFc.valueChanges
            .pipe(debounceTime(400))
            .subscribe((val) => this.processSourceChange(val));
        this.textareaFc.setValue(`Your advertising could be here`);
    }

    ngOnDestroy(): void {
        this._sub.unsubscribe();
    }

    private processSourceChange(newSource: string) {
        var result = this._parserService.parse(newSource);
        if (result === undefined)
            return

        if (result.nodes.length == 0) {
            result = this._parserService.parse(this.default());

        }
        this._displayService.display(result!);
        this.petritext = this._petrinetService.convert(result!);
    }

    public selectDiagram(event: any) {

        let text: string = "";
        switch (event.value) {
            case "default": { text = this.default(); break; }
            case "AND": { text = this.AND(); break; }
            case "XOR": { text = this.default(); break; }
        }

        this.textareaFc.setValue(text)


    }

    AND(): string {
        let diag: string = ".events\n"

        diag += "e1 start \"Start\" (60,190)\n"
        diag += "e2 end \"End\" (1600,190)\n"


        diag += ".activities\n";
        diag += "t1 service \"ServiceTask\" (442,60)\n"
        diag += "t2 manual \"ManualTask\" (442,320)\n"
        diag += "t3 usertask \"UserTask\" (1225,190)\n"

        diag += ".gateways\n"
        diag += "g1 and_split (210,190)\n"
        diag += "g2 and_join (675,190)\n"

        diag += ".sequences\n"
        diag += "connector sequenceflow \"1\" e1 g1\n"
        diag += "pfeil sequenceflow \"p2\" g1 t1\n"
        diag += "connector2 sequenceflow \"p3\" g1 t2 (210,320)\n"
        diag += "connector3 sequenceflow \"a4\" t1 g2 (675,60)\n"
        diag += "connector4 sequenceflow \"a5\" t2 g2 (675,320)\n"
        diag += "connector5 sequenceflow \"a6\" g2 t3\n"
        diag += "connector7 sequenceflow \"a8\" t3 e2\n"

        return diag;
    }

    default(): string {
        let diag: string = ".events\n"

        diag += "e1 start \"Start\" (60,190)\n"
        diag += "e2 intermediate \"IntEv\" (850,190)\n"
        diag += "e3 end \"EndEv\" (1600,190)\n"
        

        diag += ".activities\n";
        diag += "t1 service \"ServiceTask\" (442,60)\n"

        diag += "t2 manual \"ManualTask\" (442,320)\n"
        diag += "t3 usertask \"UserTask\" (1225,190)\n"

        diag += ".gateways \n"
        diag += "g1 or_split (210,190)\n"
        diag += "g2 or_join (675,190)\n"

        diag += ".sequences\n"
        diag += "connector sequenceflow \"1\" e1 g1\n"
        diag += "pfeil sequenceflow \"p2\" g1 t1\n"
        diag += "connector2 sequenceflow \"p3\" g1 t2 (210,320)\n"
        diag += "connector3 sequenceflow \"a4\" t1 g2 (675,60)\n"
        diag += "connector4 sequenceflow \"a5\" t2 g2 (675,320)\n"
        diag += "connector5 sequenceflow \"a6\" g2 e2\n"
        diag += "connector6 sequenceflow \"a7\" e2 t3\n"
        diag += "connector7 sequenceflow \"a8\" t3 e3\n"

        return diag;
    }
}

