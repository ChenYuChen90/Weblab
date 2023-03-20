// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import ZSortOnLoad from "./utilities/ZSortOnLoad";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MapManager extends cc.Component {

    private static instance: MapManager = null;
    public static get Instance() {
        return MapManager.instance;
    }
    @property(cc.Node)
    objectLayerNode: cc.Node = null;
    @property(cc.Node)
    actorLayerNode: cc.Node = null;
        

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        MapManager.instance = this;
        this.objectLayerNode.addComponent(ZSortOnLoad);
    }

    start() {
        let actors: cc.Node[] = [];
        for (let actor of this.actorLayerNode.children) {
            actors.push(actor);
        }
        for (let actor of actors) {
            // Possibly an engine bug: A node's world position can change after reparenting.
            // That's why we have to fix the position manually here.
            // Bad API :(
            let worldPosBefore = actor.convertToWorldSpaceAR(cc.Vec2.ZERO);
            actor.setParent(this.objectLayerNode);
            actor.setPosition(actor.parent.convertToNodeSpaceAR(worldPosBefore));
        }
    }

    // update (dt) {}
}
