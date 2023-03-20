// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import { ButtonState } from "../../input/IInputControls";
import Agent from "../Agent";
import Waypoint from "../navigation/Waypoint";
import WaypointGraph from "../navigation/WaypointGraph";
import { Navigator } from "./Navigator";
/**
 * An AI strategy that describes a behaviour in which the agent tries to move to the 
 * waypoint on the waypoint graph closest to the target.
 * 
 * It will not stray away from the graph beyond a distance equal to the shortest edge
 * on the graph's length.
 */
export class NavChaser extends Navigator{
    /** The agent's output to IInput. */
    private _moveAxis2D = cc.Vec2.ZERO;
    private _minGraphEdgeLength = Infinity;
    private _runTowards: cc.Node = null;
    constructor(agent: Agent, waypointGraph: WaypointGraph, runTowards: cc.Node) {
        super(agent, waypointGraph);
        this._runTowards = runTowards;
    }
    private _nextWaypoint: Waypoint = null;
    protected get nextWaypoint(): Waypoint {
        return this._nextWaypoint;
    }
    protected onTransitionFinish(): void {
        //*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*\\
        // TODO (4.2): Complete NavChaser's onTransitionFinish method.
        // [SPECIFICATIONS]
        // - NavChaser should move towards the waypoint on the waypoint graph 
        //   closest to this._runTowards.
        // - Assign your results to this._nextWaypoint.
        //*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*\\
       
        //#region [YOUR IMPLEMENTATION HERE]
        
        //#endregion
        // console.log(`NavChaser: Current: ${this.currentWaypoint.node.name}, Next: ${this.nextWaypoint.node.name}`);
    }
    public get horizontalAxis(): number {
        return this._moveAxis2D.x;
    }
    public get verticalAxis(): number {
        return this._moveAxis2D.y;
    }
    public get attack(): ButtonState {
        throw new Error("Method not implemented.");
    }
    public get interact(): ButtonState {
        throw new Error("Method not implemented.");
    }
    public get towardsTarget() {
        return  this._runTowards.position.sub(this.agent.node.position).normalize();
    }

    public get distanceFromTarget() {
        return this._runTowards.position.sub(this.agent.node.position).mag()
    }
    public start(): void {
        this._nextWaypoint = this.closestWaypoint;
        for (let waypoint of this.waypointGraph.adjacencyList) {
            for (let dist of waypoint.distances) {
                this._minGraphEdgeLength = Math.min(this._minGraphEdgeLength, dist);
            }
        }
    }

    public update(dt: number): void {
        if (this.distanceFromTarget < this._minGraphEdgeLength
            && this.currentWaypoint && this.currentWaypoint.distanceToNode(this.agent.node) < this._minGraphEdgeLength) {
            this._moveAxis2D = this.towardsTarget;
        }
        else {
            super.update(dt);
            if (this.currentWaypoint === this.nextWaypoint) {
                this._moveAxis2D = cc.Vec2.ZERO;
                this.onTransitionFinish();
            }
            else this._moveAxis2D = this.towardsNextWaypoint;
        }
        
    }

}