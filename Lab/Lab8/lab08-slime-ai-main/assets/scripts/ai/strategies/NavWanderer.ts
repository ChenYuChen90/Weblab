import { ButtonState } from "../../input/IInputControls";
import Agent from "../Agent";
import Waypoint from "../navigation/Waypoint";
import WaypointGraph from "../navigation/WaypointGraph";
import { Navigator } from "./Navigator";
/**
 * An AI strategy that describes a random-walk behaviour on a waypoint graph.
 */
export class NavWanderer extends Navigator{
    /** The agent's output to IInput. */
    private _moveAxis2D = cc.Vec2.ZERO;
    // constructor(_agent: Agent, _waypointGraph: WaypointGraph) {
    //     super(_agent, _waypointGraph);
    // }
    
    private _nextWaypoint: Waypoint = null;
    protected get nextWaypoint(): Waypoint {
        return this._nextWaypoint;
    }
    protected onTransitionFinish(): void {
        this._nextWaypoint = this.currentWaypoint.adjacentWaypoints[Math.floor(Math.random() * this.currentWaypoint.adjacentWaypoints.length)]
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
    public start(): void {
        this._nextWaypoint = this.closestWaypoint;
    }

    //*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*\\
    // TODO (3.2): Implement NavWanderer.update().
    // [SPECIFICATIONS]
    // - Trace Navigator.ts to figure out what you can use to make NavWanderer
    //   move towards the next waypoint AND call onTransitionFinish() after
    //   arriving.
    // - Hint: Two lines of code!
    //*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*\\
    public update(dt: number): void {
        //#region [YOUR IMPLEMENTATION HERE]
        
        //#endregion
    }

}