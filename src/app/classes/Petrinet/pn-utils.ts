import { BpmnNode } from "../Basic/Bpmn/BpmnNode";
import { BpmnGatewayJoinOr } from "../Basic/Bpmn/gateways/BpmnGatewayJoinOr";
import { BpmnGatewaySplitOr } from "../Basic/Bpmn/gateways/BpmnGatewaySplitOr";
import { PnElement } from "./pn-element";
import { PnOrJoin } from "./pn-or-join";
import { PnOrSplit } from "./pn-or-split";
import { Transition } from "./transition";

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

    static addCounterToLabelAndId(transitions: Array<Transition>) {
        let counter: number = 1;
        transitions.forEach(trans => {
            trans.id += counter;
            trans.label += counter;
            counter++;
        })
    }

    static getIds(elements: Array<PnElement>): Array<string> {
        let ids: Array<string> = new Array<string>();
        for (let el of elements)
            ids.push(el.id)

        return ids;
    }

    static getMatchingOrGateways(nodes: Array<BpmnNode>): Map<BpmnNode, BpmnNode> {

        let map = new Map<BpmnNode, BpmnNode>();

        for (let node of nodes) {
            //TODO add error handling - if for some reason ORSplit doesn't have outgoing edges
            if (this.isSplitOr(node))
                map.set(node, this.getCorrespondingOrJoin(node)!)
        }

        return map;
    }

    static getMatchingOrSplitJoinTransitions(splits: Array<Transition>, joins: Array<Transition>): Map<Transition, Transition> {
        let map = new Map<Transition, Transition>();
        splits.forEach(split => {
            let matchingJoin = joins.find(join => this.sameIndex(join, split))
            if (matchingJoin != undefined)
                map.set(split, matchingJoin)
            //TODO
            //else
        })
        return map;
    }

    private static sameIndex(transOne: Transition, transTwo: Transition): boolean {
        return transOne.id.endsWith(transTwo.id.charAt(transTwo.id.length - 1))
    }

    private static isSplitOr(node: BpmnNode): boolean {
        return node instanceof BpmnGatewaySplitOr
    }

    private static isJoinOr(node: BpmnNode): boolean {
        return node instanceof BpmnGatewayJoinOr
    }

    private static hasOutEdges(node: BpmnNode): boolean {
        return node.outEdges.length > 0;
    }

    private static next(node: BpmnNode): BpmnNode {
        return node.outEdges[0].to
    }

    static getCorrespondingOrJoin(node: BpmnNode): BpmnNode | null {

        while (this.hasOutEdges(node)) {
            node = this.next(node);

            if (this.isJoinOr(node))
                return node;

            //nested OR gateway
            if (this.isSplitOr(node))
                node = this.getCorrespondingOrJoin(node)!;
        }

        return null;
    }
}