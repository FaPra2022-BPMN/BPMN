import { PnElement } from "./pn-element";

export class Transition extends PnElement{
    private connected: boolean;
    constructor(_id: string, public _label: string){
        super(_id);
        this.connected = false;
    }

    print(): string{
       
        return this._id + " " + this.removeWhiteSpaces(this._label)
    }

    removeWhiteSpaces(value: string): string{
        return value.replace(" ", "-")
    }

    isConnected(): boolean{
        return this.connected
    }

    setConnected(): void{
        this.connected = true;
    }

}