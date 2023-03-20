import { ButtonState } from "../../input/IInputControls";
import Agent from "../Agent";
import { AI } from "./AgentStrategy";

export class Coward extends AI.Strategy{
    private _agent: Agent = null;
    private _runAwayFrom: cc.Node = null;
    /**
     * 
     * @param _agent The agent using the strategy.
     * @param _runAwayFrom The node for the agent to run away from.
     */
    constructor(_agent: Agent, _runAwayFrom: cc.Node) {
        super();
        this._agent = _agent;
        this._runAwayFrom = _runAwayFrom;
    }

    private _moveAxis2D: cc.Vec2 = cc.Vec2.ZERO;

    public get awayFromTarget() {
        return this._agent.node.position.sub(this._runAwayFrom.position).normalize();
    }

    public get distanceFromTarget() {
        return this._runAwayFrom.position.sub(this._agent.node.position).mag()
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
        
    }
    public update(dt: number): void {
        this._moveAxis2D = this.awayFromTarget;
    }

}