import { PnUtils } from "src/app/classes/Petrinet/pn-utils";



describe('get all combinations of ids', () => {


    beforeEach(() => {


    });



    test('get all combinations of 2 ids', () => {
        let ids: string[] = ["1", "2"]
        let combis: string[][] = PnUtils.getCombinationsOfIds(ids);
        PnUtils.printCombis(combis)
        //expect(nestedSplit?.id).toEqual(gatewaySplitOrNested.id)

    });
    test('get all combinations of 3 ids', () => {
        let ids: string[] = ["1", "2", "3"]
        let combis: string[][] = PnUtils.getCombinationsOfIds(ids);
        PnUtils.printCombis(combis)
        //[[1,2][1,3][1,2,3][2,3]]
        //expect(nestedSplit?.id).toEqual(gatewaySplitOrNested.id)

    });

    test('get all combinations of 4 ids', () => {
        let ids: string[] = ["1", "2", "3", "4"]
        let combis: string[][] = PnUtils.getCombinationsOfIds(ids);
        PnUtils.printCombis(combis)
        //expect(nestedSplit?.id).toEqual(gatewaySplitOrNested.id)

    });


});