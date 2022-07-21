export class PnUtils {

    static getCombinationsOfIds(ids: string[]): string[][] {
        let combis: string[][] = [];
        while (ids.length > 1) {
            //minimal combination consists of 2 values
            let combi_len: number = 2;
            while (combi_len <= ids.length) {

                combis.push(...this.getCombinationsOfLength(ids, combi_len))
                combi_len++;
            }

            //remove first element
            ids.splice(0, 1);
        }



        return combis;
    }

    private static getCombinationsOfLength(ids: string[], len: number): string[][] {
        let combis: string[][] = [];

        let start: number = 1;
        let end: number = start + len - 1;
        while (end <= ids.length) {
            //always add first element and combination of <len-1> other elements
            let combi: string[] = [ids[0], ...ids.slice(start, end)];
            combis.push(combi);

            start++;
            end++;
        }

        return combis;

    }

    static printCombis(combis: string[][]): void {
        let listOfLists: string = "["
        for (let list of combis) {
            listOfLists += "["
            for (let value of list)
                listOfLists += value + ","
            listOfLists = listOfLists.substring(0, listOfLists.length - 1) + "]";
        }

        listOfLists += "]"

        console.log(listOfLists)
    }



}