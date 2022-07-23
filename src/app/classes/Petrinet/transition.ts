import { PnElement } from "./pn-element";

export class Transition extends PnElement{
    
    constructor(id: string, public label: string){
        super(id);
    }

    print(): string{
       
        return this.id + " " + this.removeWhiteSpaces(this.label)
    }

    removeWhiteSpaces(value: string): string{
        return value.replace(" ", "-")
    }

    addCounterToLabelAndId(counter: number){
        this.id += counter;
        this.label += counter;
    }

}