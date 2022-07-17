import { PnElement } from "./pn-element";

export class Transition extends PnElement{
    
    constructor(_id: string, public label: string){
        super(_id);
    }

    print(): string{
       
        return this.id + " " + this.removeWhiteSpaces(this.label)
    }

    removeWhiteSpaces(value: string): string{
        return value.replace(" ", "-")
    }

    

}