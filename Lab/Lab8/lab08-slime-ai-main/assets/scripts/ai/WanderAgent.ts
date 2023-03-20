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
import { AI } from "./strategies/AgentStrategy";
import { Wanderer } from "./strategies/Wanderer";
const { ccclass, property } = cc._decorator;

function randomPointOnCircle(radius: number = 1) {
    let angle = Math.random() * Math.PI * 2;
    return new cc.Vec2(Math.cos(angle) * radius, Math.sin(angle) * radius);
}
/**
 * An agent that simply wanders around like a cute animal.
 */
@ccclass
export default class WanderAgent
    extends Agent
    implements IInputControls{

    /** The agent will move for this long before stopping to wait. */
    @property(cc.Float)
    moveDuration = 1.0;
    /** The agent will move at this speed. */
    @property(cc.Float)
    moveSpeed = 5.0;
    /** The agent will wait for this long before starting to move again. */
    @property(cc.Float)
    waitDuration = 0.5;
    /** The actual wait duration will be randomized by this factor, 
     *  such that the actual wait duration is a random number between
     *  waitDuration x (1 - waitRandomFactor) and 
     *  waitDuration x (1 + waitRandomFactor).
    */
    @property(cc.Float)
    waitRandomFactor = 0.1;


    private _strategy : AI.Strategy = null;

    public get horizontalAxis() {
        if (!this._strategy) return 0;
        return this._strategy.horizontalAxis * this.moveSpeed;
    };
    public get verticalAxis() {
        if (!this._strategy) return 0;
        return this._strategy.verticalAxis * this.moveSpeed;
    }
    attack: ButtonState = ButtonState.Rest;
    interact: ButtonState = ButtonState.Rest;

    
    //*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*\\
    // TODO (1.4): Complete WanderAgent using the Wanderer strategy.
    // [SPECIFICATIONS]
    // - Assign a new Wanderer to this.strategy, with WandererAgent's properties
    //   as the constructor's arguments.
    // - Invoke its "start" method inside WanderAgent's "start" method. 
    // - Invoke its "update" method inside WanderAgent's "agentUpdate" method.
    //*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*\\

    protected agentUpdate(dt: number): void {
        //#region [YOUR IMPLEMENTATION HERE]
        this._strategy.update(dt);
        //#endregion
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //#region [YOUR IMPLEMENTATION HERE]
        this._strategy = new Wanderer(this.moveDuration, this.waitDuration, this.waitRandomFactor);
        //#endregion
    }

    start() {
        //#region [YOUR IMPLEMENTATION HERE]
        this._strategy.start();
        //#endregion
    }

    // !!! DO NOT IMPLEMENT "update"
    // !!! If you want to, you'll have to call the parent class's update method as well!
    // !!! Use agentUpdate instead.
    // update (dt) {}
}
