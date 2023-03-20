// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import { ButtonState, IInputControls } from "../input/IInputControls";
import Agent from "./Agent";
import WaypointGraph from "./navigation/WaypointGraph";
import { NavWanderer } from "./strategies/NavWanderer";

const {ccclass, property} = cc._decorator;

//*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*\\
// TODO (3.3): Complete NavWanderAgent's behaviour using NavWanderer.
// [SPECIFICATIONS]
// - Check out the other agents to figure out what's missing, and connect
//   everything together!
//*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*\\

@ccclass
export default class NavWanderAgent
    extends Agent 
    implements IInputControls{
    
    public get horizontalAxis(): number {
        //#region [YOUR IMPLEMENTATION HERE]
        return 0;
        //#endregion
    }
    public get verticalAxis(): number {
        //#region [YOUR IMPLEMENTATION HERE]
        return 0;
        //#endregion
    }
    attack: ButtonState = ButtonState.Rest;
    interact: ButtonState = ButtonState.Rest;
    @property(WaypointGraph)
    waypointGraph: WaypointGraph = null;

    //#region [YOUR IMPLEMENTATION HERE]
    
    //#endregion
    protected agentUpdate(dt: number): void {
        //#region [YOUR IMPLEMENTATION HERE]
        
        //#endregion
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //#region [YOUR IMPLEMENTATION HERE]
        
        //#endregion
    }

    start () {
        //#region [YOUR IMPLEMENTATION HERE]
        
        //#endregion
    }

    // update (dt) {}
}
