// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import { IInputControls, ButtonState } from "../input/IInputControls";
import Agent from "./Agent";
import WaypointGraph from "./navigation/WaypointGraph";
import { NavChaser } from "./strategies/NavChaser";
import { NavWanderer } from "./strategies/NavWanderer";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NavChaseAgent
    extends Agent 
    implements IInputControls{
    
    public get horizontalAxis(): number { 
        if (!this._navChaser) return 0;
        return this._navChaser.horizontalAxis
    }
    public get verticalAxis(): number {
        if (!this._navChaser) return 0;
        return this._navChaser.verticalAxis
    }
    attack: ButtonState = ButtonState.Rest;
    interact: ButtonState = ButtonState.Rest;
    @property(WaypointGraph)
    waypointGraph: WaypointGraph = null;
    @property(cc.Node)
    runTowards: cc.Node = null;

    private _navChaser: NavChaser = null;
    protected agentUpdate(dt: number): void {
        this._navChaser.update(dt);
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this._navChaser = new NavChaser(
            this,
            this.waypointGraph,
            this.runTowards
        );
    }

    start() {
        this._navChaser.start();
    }

    // update (dt) {}
}
