
export abstract class PnElement {

    abstract print(): string;


    constructor(public id: string) {
        this.connected = false;

    }

    connected: boolean;

    isConnected(): boolean{
        return this.connected
    }

    setConnected(): void{
        this.connected = true;
    }



}