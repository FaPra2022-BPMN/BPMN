import { PnElement } from "./pn-element";

export class Transition extends PnElement{
    
    constructor(_id: string, public _label: string){
        super(_id);
    }

    print(): string{
       
        return this._id + " " + this.removeWhiteSpaces(this._label)
    }

    removeWhiteSpaces(value: string): string{
        return value.replace(" ", "-")
    }

}