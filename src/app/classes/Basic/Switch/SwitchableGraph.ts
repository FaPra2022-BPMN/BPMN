import {BpmnEdge} from '../Bpmn/BpmnEdge/BpmnEdge';
import {BpmnGraph} from '../Bpmn/BpmnGraph';
import {BpmnNode} from '../Bpmn/BpmnNode';
import { BpmnUtils } from '../Bpmn/BpmnUtils';
import {BpmnGateway} from '../Bpmn/gateways/BpmnGateway';
import {GetSvgManager} from '../Interfaces/GetSvgManager';
import {Svg} from '../Svg/Svg';
import {SvgManager} from '../Svg/SvgManager/SvgManager';
import { ClassicSwitch } from './classic-switch';
import { MarcelsSwitch } from './marcels-switch';
import {SwitchController} from './switch-controller';
import {SwitchableEdge} from './SwitchableEdge';
import {SwitchableGateway} from './SwitchableGateway';
import {SwitchableNode} from './SwitchableNode';
import {SwitchState} from './switchstatetype';
import {SwitchUtils} from './SwitchUtils';


export class SwitchableGraph implements GetSvgManager {

    private _switchEdges: SwitchableEdge[] = []
    private _switchNodes: SwitchableNode[] = []
    private _controller: SwitchController;
    private _nodeMap: Map<BpmnNode, SwitchableNode>;
    

    constructor(bpmnGraph: BpmnGraph, controllerTyp: number) {
        if(controllerTyp != 1) 
            this._controller = new ClassicSwitch(this) 
        else  
            this._controller = new MarcelsSwitch(this);

        this._nodeMap = new Map<BpmnNode, SwitchableNode>();

        bpmnGraph.edges.forEach((bpmnEdge: BpmnEdge) => {
            let switchEdge: SwitchableEdge = new SwitchableEdge(bpmnEdge);
            SwitchUtils.addItem(switchEdge, this._switchEdges);
            this.addNodesConnectedByEdge(bpmnEdge, this._controller);
        })
    }

    get nodeMap() {
        return this._nodeMap
    }

    getNodes(): BpmnNode[] {
        const bpmnNodes: BpmnNode[] = [];
        this.switchNodes.forEach(switchNode => bpmnNodes.push(switchNode.bpmnNode));
        return bpmnNodes;
    }


    get controller(): SwitchController {
        return this._controller
    }

    getNode(id: string): SwitchableNode | undefined {
        return this._switchNodes.find(node => node.id === id);
    }

    svgCreation(): SVGElement {
        const svgContainer = Svg.container();
        const svgNodes = Svg.container('nodes');
        const svgEdges = Svg.container('edges');


        for (let switchNode of this._switchNodes) {
            if (switchNode.isStartEvent())
                switchNode.switchTo(SwitchState.enableable)
            else
                switchNode.switchTo(SwitchState.disabled)
            svgNodes.appendChild(switchNode.bpmnNode.svgManager.getSvg());
        }

        for (let switchEdge of this._switchEdges) {
            svgEdges.appendChild(switchEdge.bpmnEdge.svgManager.getSvg());
        }

        svgContainer.appendChild(svgNodes);
        svgContainer.appendChild(svgEdges);
        return svgContainer;
    }


    addNewSwitchNode(bpmnNode: BpmnNode, controller: SwitchController): SwitchableNode {
        let node = (bpmnNode instanceof BpmnGateway) ? new SwitchableGateway(bpmnNode, controller) : new SwitchableNode(bpmnNode, controller);
        SwitchUtils.addItem(node, this._switchNodes);
        return node;
    }

    addNodesConnectedByEdge(edge: BpmnEdge, controller: SwitchController): void {
        //create node that is source of the edge
        let switchNodeFrom: SwitchableNode = this.getSwitchNode(edge.from);
        if (switchNodeFrom == null)
            switchNodeFrom = this.addNewSwitchNode(edge.from, controller);

        //create node that is target of the edge
        let switchNodeTo: SwitchableNode = this.getSwitchNode(edge.to);
        if (switchNodeTo == null)
            switchNodeTo = this.addNewSwitchNode(edge.to, controller);

        //register predecessor and successor nodes
        switchNodeTo.addPredecessor(switchNodeFrom);
        switchNodeFrom.addSuccessor(switchNodeTo);
        if(BpmnUtils.isDefaultEdge(edge)) switchNodeFrom.addDefaultSuccessor(switchNodeTo);
        
        //add to map
        this._nodeMap.set(edge.from, switchNodeFrom)
        this._nodeMap.set(edge.to, switchNodeTo)
    }

    private getSwitchNode(nodeToFind: BpmnNode): any {

        for (let node of this._switchNodes)
            if (node.id === nodeToFind.id)
                return node
        return null
    }

    get switchNodes(): SwitchableNode[] {
        return this._switchNodes
    }


    private _svgManager: SvgManager | undefined;
    public get svgManager(): SvgManager {
        if (this._svgManager == undefined) {
            this._svgManager = new SvgManager("SwitchableGraph", () => this.svgCreation())
        }
        return this._svgManager;
    }



}
