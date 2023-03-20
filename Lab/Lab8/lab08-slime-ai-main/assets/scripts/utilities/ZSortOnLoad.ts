// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

/**
 * A component that makes every node below the node it is attached to render in a way 
 * such that it appears behind nodes that are located below it.
 */
@ccclass
export default class ZSortOnLoad extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        for (let node of this.node.children) {
            node.zIndex = 10000 + -node.y;
        }
    }

    // start () {

    // }

    // update (dt) {}
}
